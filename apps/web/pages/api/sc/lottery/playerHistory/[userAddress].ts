import { NextApiRequest, NextApiResponse } from "next";

import {
  ErrorResponse, Tickets,
} from "../../../../../components/type";
import { axiosClient } from "../../../../../utils/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: NextApiRequest,
  res: NextApiResponse & ({ winRounds: number[] } | ErrorResponse)
) {
  const {
    query: { userAddress },
  } = req;

  if (userAddress === undefined) {
    return res.status(400).json({ error: "Invalid wallet address." });
  }

  const resp = await axiosClient.get(`/wallet/${userAddress}/histories`)

  if (resp !== null) {
    let data : Tickets = resp.data
    return res
      .status(200)
      .json(data);
  } else {
    return res.status(404).json({ message: "No response." });
  }
}
