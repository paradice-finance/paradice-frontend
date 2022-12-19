import { NextApiRequest, NextApiResponse } from "next";
import { erc20Read } from "../../../../components/smart-contract/readContract";

export default async function currentBalance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        query: { tokenAddress },
        body,
      } = req;

      if (!tokenAddress || !body || !body.walletAddress) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      const walletbalance = await erc20Read("balanceOf", String(tokenAddress), [
        body.walletAddress,
      ]);
      const decimals = await erc20Read("decimals", String(tokenAddress));

      return res.status(200).json({
        balance: Number(walletbalance) / Math.pow(10, Number(decimals)),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
}
