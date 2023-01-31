import { NextApiRequest, NextApiResponse } from "next";
import { lotteryRead } from "../../../../../components/smart-contract/readContract";
import {
  LotteryEnv,
  ErrorResponse,
  RemainTicket,
} from "../../../../../components/type";
import { convertBignumber } from "../../../../../utils/convertor";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & ({ winRounds: number[] } | ErrorResponse)
) {
  const {
    query: { userAddress },
  } = req;

  if (userAddress === undefined) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const { address, chainId } = LotteryEnv;

  const resp = (await lotteryRead("getWinningLotteries", address, chainId, [
    String(userAddress),
  ])) as any;

  if (resp !== null) {
    return res
      .status(200)
      .json({ winPrice: resp.map((r: any) => convertBignumber(r)) });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
