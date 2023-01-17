import { NextApiRequest, NextApiResponse } from "next";
import { lotteryRead } from "../../../../components/smart-contract/readContract";
import {
  LotteryEnv,
  ErrorResponse,
  RemainTicket,
} from "../../../../components/type";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & (RemainTicket | ErrorResponse)
) {
  const { address, chainId } = LotteryEnv;

  const remainTicket = await lotteryRead(
    "getAvailableTicketQty",
    address,
    chainId
  );

  if (remainTicket !== null) {
    return res.status(200).json({ remainTicket });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
