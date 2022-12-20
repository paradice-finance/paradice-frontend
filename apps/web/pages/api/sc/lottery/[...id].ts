import { NextApiRequest, NextApiResponse } from "next";
import { getLottery } from "../../../../components/smart-contract/getLottery";
import { ErrorResponse, LotteryInfo } from "../../../../components/type";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & (LotteryInfo | ErrorResponse)
) {
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;

    if (id === undefined) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const lottery = await getLottery(String(id));
    if (lottery !== null) {
      res.status(200).json(lottery);
      return;
    } else {
      res.status(404).json({ error: "Not Found LotteryInfo" });
      return;
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
}
