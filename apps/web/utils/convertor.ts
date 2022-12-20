import { BigNumber } from "ethers";

export function convertBignumber(input: any) {
  if (input && input._isBigNumber) {
    return Number(BigNumber.from(input._hex).toString());
  }

  return input;
}
