import { NextApiRequest, NextApiResponse } from "next";
import { erc20Read } from "../../../../components/smart-contract/readContract";
import { readContracts } from "wagmi";
import erc20ABI from "../../../../public/abi/erc20.json";
import { LotteryEnv, WalletBalance } from "../../../../components/type";
import { convertBignumber } from "../../../../utils/convertor";
export default async function token(
  req: NextApiRequest,
  res: NextApiResponse & WalletBalance
) {
  if (req.method === "POST") {
    try {
      const {
        query: { tokenAddress },
        body,
      } = req;

      if (!tokenAddress || !body || !body.walletAddress) {
        return res.status(400).json({ error: "Bad Request" });
      }

      const walletbalance = await erc20Read("balanceOf", String(tokenAddress), [
        body.walletAddress,
      ]);
      const decimals = await erc20Read("decimals", String(tokenAddress));

      const erc20contract = {
        address: String(tokenAddress),
        abi: erc20ABI,
        chainId: LotteryEnv.chainId,
      };

      const erc20 = await readContracts({
        contracts: [
          {
            ...erc20contract,
            functionName: "decimals",
          },
          {
            ...erc20contract,
            functionName: "balanceOf",
            args: [body.walletAddress],
          },
          {
            ...erc20contract,
            functionName: "allowance",
            args: [body.walletAddress, LotteryEnv.address],
          },
        ],
      });
      const denominator = Math.pow(10, Number(convertBignumber(erc20[0])));
      const b = Number(convertBignumber(erc20[1]));
      const a = Number(convertBignumber(erc20[2]));

      return res.status(200).json({
        balance: b / denominator,
        allowance: a / denominator,
      });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
