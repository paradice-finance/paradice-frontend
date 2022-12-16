export type ContractReadResult = { [key: string]: any } | number;
import abi from "../../public/abi/lottery.json";
import erc20ABI from "../../public/abi/erc20.json";
import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";

export async function lotteryRead(
  functionName: string,
  address: string,
  chainId: number,
  args?: string[]
): Promise<ContractReadResult> {
  const resp = (await readContract({
    address,
    abi: abi,
    functionName,
    chainId,
    args,
  })) as any;

  if (resp && resp._isBigNumber) {
    return Number(BigNumber.from(resp._hex).toString());
  }

  return resp;
}

// export async function contractRead(
//   functionName: string,
//   args?: string[]
// ): Promise<ContractReadResult> {
//   const resp = (await readContract({
//     address: process.env.LOTTERY_ADDRESS,
//     abi: abi,
//     functionName,
//     chainId: Number(process.env.CHAIN_ID),
//     args,
//   })) as any;

//   if (resp && resp._isBigNumber) {
//     return Number(BigNumber.from(resp._hex).toString());
//   }

//   return resp;
// }

type Erc20Function =
  | "symbol"
  | "name"
  | "allowance"
  | "balanceOf"
  | "decimals"
  | "totalSupply";

export async function erc20Read(
  functionName: Erc20Function,
  tokenAddress: string,
  args?: string[]
): Promise<ContractReadResult> {
  const resp = (await readContract({
    address: tokenAddress,
    abi: erc20ABI,
    functionName,
    chainId: Number(process.env.CHAIN_ID),
    args,
  })) as any;

  if (resp && resp._isBigNumber) {
    return Number(BigNumber.from(resp._hex).toString());
  }

  return resp;
}
