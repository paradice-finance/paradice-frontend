import { LotteryEnv } from "../type";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryABI from "../../public/abi/lottery.json";
import { Spin } from "antd";
import { useEffect, useState } from "react";

interface RefundTicketProps {
  refundIds: Array<number>;
  setRefundZero: () => void;
  setIsLoading: (b: boolean) => void;
}

export const RefundButton = ({
  refundIds,
  setRefundZero,
  setIsLoading: setMainRefundLoading,
}: RefundTicketProps) => {
  const { chainId, address } = LotteryEnv;

  const { config } = usePrepareContractWrite({
    address: address,
    abi: lotteryABI,
    functionName: "batchRefundTicket",
    chainId,
    args: [refundIds],
  });

  const {
    data,
    isLoading: isWriteLoad,
    write,
    isError,
  } = useContractWrite(config);
  const [isRefundProcessing, setIsRefundProcessing] = useState(false);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (!isLoading && !isWriteLoad && isRefundProcessing) {
    setIsRefundProcessing(false);
    setRefundZero();
    setMainRefundLoading(false);
  }

  useEffect(() => {
    if (isError) {
      setIsRefundProcessing(false);
      setMainRefundLoading(false);
    }
  }, [isError, setIsRefundProcessing, setMainRefundLoading]);

  useEffect(() => {
    if (isLoading) {
      setIsRefundProcessing(true);
    }
  }, [isLoading, setIsRefundProcessing, setMainRefundLoading]);

  const onClick = () => {
    write();
    setMainRefundLoading(true);
  };

  return (
    <>
      {isWriteLoad || isLoading ? (
        <Spin size="default" />
      ) : (
        <button
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed] disabled:bg-gray-300"
          disabled={!write}
          onClick={() => onClick()}
        >
          Refund Selected
        </button>
      )}
    </>
  );
};
