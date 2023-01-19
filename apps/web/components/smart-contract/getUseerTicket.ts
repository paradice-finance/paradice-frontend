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
    if (ticketByRound.length === 0) return { tickets: [] };
    const ticketIds = ticketByRound.map((t) => convertBignumber(t));
    const allticket = (await lotteryRead("getTickets", address, chainId, [
      ticketIds,
    ])) as any[];

    const response = allticket.map((d, i) => {
      const map = new Map(Object.entries(d));
      return {
        ticketId: ticketIds[i],
        chosenNumber: String(convertBignumber(map.get("number"))),
      };
    });
    return { tickets: response };
  } catch (e) {
    console.log(e);
    return null;
  }
};
