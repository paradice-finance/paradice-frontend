import { useState } from "react";
import { LotteryEnv } from "../type";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryABI from "../../public/abi/lottery.json";
import { BigNumber } from "ethers";

interface BuyTicketProps {
  lotteryNumbers: number[];
  affiliateAddress: string;
  isUseAffiliate: boolean;
}

export const BuyTicketButton = ({
  lotteryNumbers,
  affiliateAddress,
  isUseAffiliate,
}: BuyTicketProps) => {
  const { chainId, address } = LotteryEnv;

  const { config } = usePrepareContractWrite({
    address: address,
    abi: lotteryABI,
    functionName: "batchBuyTicket",
    chainId,
    args: [
      lotteryNumbers.length,
      lotteryNumbers,
      affiliateAddress,
      isUseAffiliate,
    ],
  });

  const { data, isLoading: isWriteLoad, write } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      {isWriteLoad || isLoading ? (
        <button
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6"
          disabled
        >
          Loading...
        </button>
      ) : (
        <button
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed]"
          disabled={!write}
          onClick={() => write?.()}
        >
          Buy
        </button>
      )}
    </>
  );
};
