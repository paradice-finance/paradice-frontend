import { LotteryEnv } from "../type";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryABI from "../../public/abi/lottery.json";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export const ClaimButton = () => {
  const { chainId, address } = LotteryEnv;
  const { config } = usePrepareContractWrite({
    address: address,
    abi: lotteryABI,
    functionName: "claimReward",
    chainId,
  });

  const {
    data,
    isLoading: isWriteLoad,
    write,
    isError,
  } = useContractWrite(config);
  const [isClaimProcessing, setIsClaimProcessing] = useState(false);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (!isLoading && !isWriteLoad && isClaimProcessing) {
    setIsClaimProcessing(false);
  }

  useEffect(() => {
    if (isError) {
      setIsClaimProcessing(false);
    }
  }, [isError, setIsClaimProcessing]);

  useEffect(() => {
    if (isLoading) {
      setIsClaimProcessing(true);
    }
  }, [isLoading, setIsClaimProcessing]);

  const onClick = () => {
    write();
  };

  return (
    <>
      <div>
        {isWriteLoad || isLoading ? (
          <Spin size="default" />
        ) : (
          <button
            className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed] disabled:bg-gray-300"
            disabled={!write}
            onClick={() => onClick()}
          >
            {write ? "Claim Reward" : "No reward to cliam"}
          </button>
        )}
      </div>
    </>
  );
};
