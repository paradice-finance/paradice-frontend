import { BigNumber } from "ethers";
import { readContracts } from "wagmi";
import { ContractReadResult, lotteryRead } from "./readContract";
import { LotteryEnv, LotteryInfo } from "../type";
import erc20ABI from "../../public/abi/erc20.json";

export async function getLottery(roundId: string): Promise<LotteryInfo | null> {
  const { address, chainId } = LotteryEnv;
  try {
    if (roundId === "current") {
      const resp = await lotteryRead("getCurrentLottery", address, chainId);
      roundId = String(resp);
    }
    const lottery: ContractReadResult = await lotteryRead(
      "getBasicLottoInfo",
      address,
      chainId,
      [roundId]
    );

    // Create a Map object from the contract read result
    const lotteryMap = new Map(Object.entries(lottery));

    //remove number keys
    lotteryMap.forEach((_, key) => {
      if (/^\d+$/.test(key)) {
        lotteryMap.delete(key);
      }
    });

    //get erc20 from smart conntract
    const erc20contract = {
      address: lotteryMap.get("tokenAddress"),
      abi: erc20ABI,
      chainId,
    };

    const erc20 = await readContracts({
      contracts: [
        {
          ...erc20contract,
          functionName: "decimals",
        },
        {
          ...erc20contract,
          functionName: "symbol",
        },
      ],
    });

    // Convert the BigNumber values to numbers
    for (const [key, value] of Array.from(lotteryMap.entries())) {
      if (value._isBigNumber) {
        if (key === "ticketPrice") {
          lotteryMap.set(key, Number(BigNumber.from(value).toString()));
        } else {
          lotteryMap.set(key, BigNumber.from(value).toNumber());
        }
      }
    }

    // Use object destructuring to create the lotteryInfo object from the Map object
    const lotteryInfo: LotteryInfo = {
      lotteryID: lotteryMap.get("lotteryID"),
      lotteryStatus: lotteryMap.get("lotteryStatus"),
      tokenAddress: lotteryMap.get("tokenAddress"),
      sizeOfLottery: lotteryMap.get("sizeOfLottery"),
      ticketPrice: lotteryMap.get("ticketPrice"),
      winningTicketId: lotteryMap.get("winningTicketId"),
      lotteryAddress: address,
      currecyDecimals: Number(erc20[0]),
      currency: String(erc20[1]),
    };
    return lotteryInfo;
  } catch (e) {
    console.log(e);
    return null;
  }
}
