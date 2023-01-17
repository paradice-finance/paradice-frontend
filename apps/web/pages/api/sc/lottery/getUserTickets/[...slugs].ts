import { NextApiRequest, NextApiResponse } from "next";
import { getUserTickets } from "../../../../../components/smart-contract/getUseerTicket";
import { ErrorResponse, UserTicket } from "../../../../../components/type";
import { isAddress } from "ethers/lib/utils.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & (UserTicket | ErrorResponse)
) {
  const {
    query: { slugs },
  } = req;

  if (slugs === undefined || slugs.length != 2) {
    return res.status(400).json({ error: "Invalid Data Input" });
  }

  if (!isAddress(slugs[0])) {
    return res.status(400).json({ error: "Invalid Wallet Address" });
  }

  const userTickets = await getUserTickets(slugs[0], slugs[1]);
  return res.status(200).json(userTickets);
}

//curl localhost:3000/api/sc/lottery/getUserTickets/0x2cf6De37eCDCC8c6213Def4502a46031269B2fe2/current
