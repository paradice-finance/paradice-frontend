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
  if (req.method === "GET") {
    const { address, chainId } = LotteryEnv;

    const remainTicket = await lotteryRead(
      "getAvailableTicketQty",
      address,
      chainId
    );

    if (remainTicket !== null) {
      res.status(200).json({ remainTicket });
      return;
    } else {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
}
