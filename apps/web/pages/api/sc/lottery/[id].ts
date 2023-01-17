import { NextApiRequest, NextApiResponse } from "next";
import { getLottery } from "../../../../components/smart-contract/getLottery";
import { ErrorResponse, LotteryInfo } from "../../../../components/type";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & (LotteryInfo | ErrorResponse)
) {
  const {
    query: { id },
  } = req;

  if (id === undefined) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const lottery = await getLottery(String(id));
  if (lottery !== null) {
    return res.status(200).json(lottery);
  } else {
    return res.status(404).json({ error: "Not Found LotteryInfo" });
  }
}
