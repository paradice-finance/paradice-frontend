import { lotteryRead } from "./readContract";
import { LotteryEnv, UserTicket } from "../type";
import { readContracts } from "wagmi";
import abi from "../../public/abi/lottery.json";
import { convertBignumber } from "../../utils/convertor";

export const getUserTickets = async (
  userAddress: string,
  roundId?: string
): Promise<UserTicket> => {
  try {
    const { address, chainId } = LotteryEnv;
    if (roundId === "current") {
      const resp = await lotteryRead("getCurrentLottery", address, chainId);
      roundId = String(resp);
    }

    const ticketByRound = (await lotteryRead(
      "getUserTickets",
      address,
      chainId,
      [roundId, userAddress]
    )) as Array<any>;
    if (ticketByRound.length === 0) return { numbers: [] };

    const allticket = (await lotteryRead("getTickets", address, chainId, [
      ticketByRound.map((t) => convertBignumber(t)),
    ])) as any[];

    const response = allticket.map((d) => {
      const map = new Map(Object.entries(d));
      return convertBignumber(map.get("number"));
    });

    return { numbers: response };
  } catch (e) {
    console.log(e);
    return null;
  }
};
