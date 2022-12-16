import { NextApiRequest, NextApiResponse } from "next";
import { getLottery } from "../../../../components/smart-contract/getLottery";

export default async function (req: NextApiRequest, res: NextApiResponse) {
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
    } else {
      res.status(500).end;
    }
  } else {
    res.status(405).end;
  }
}
