export type ContractReadResult = { [key: string]: any } | number;
import abi from "../../public/abi/lottery.json";
import erc20ABI from "../../public/abi/erc20.json";
import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { convertBignumber } from "../../utils/convertor";

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

  // if (resp && resp._isBigNumber) {
  //   return Number(BigNumber.from(resp._hex).toString());
  // }

  return convertBignumber(resp);
}

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

  // if (resp && resp._isBigNumber) {
  //   return Number(BigNumber.from(resp._hex).toString());
  // }

  return convertBignumber(resp);
}
