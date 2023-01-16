import { NextApiRequest, NextApiResponse } from "next";
import { getUserTickets } from "../../../../../components/smart-contract/getUseerTicket";
import { ErrorResponse, UserTicket } from "../../../../../components/type";
import { isAddress } from "ethers/lib/utils.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & (UserTicket | ErrorResponse)
) {
  if (req.method === "GET") {
    const {
      query: { slugs },
    } = req;

    if (slugs === undefined || slugs.length != 2) {
      res.status(400).json({ error: "Invalid Data Input" });
      return;
    }

    if (!isAddress(slugs[0])) {
      res.status(400).json({ error: "Invalid Wallet Address" });
      return;
    }

    const userTickets = await getUserTickets(slugs[0], slugs[1]);
    res.status(200).json(userTickets);

    return;
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
}

//curl localhost:3000/api/sc/lottery/getUserTickets/0x2cf6De37eCDCC8c6213Def4502a46031269B2fe2/current
