import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import erc20ABI from "../../public/abi/erc20.json";
import { LotteryEnv } from "../type";
import { BigNumber } from "ethers";

interface ApproveButtonProps {
  tokenAddress: string;
  decimals: number;
}

export const ApproveButton = ({
  tokenAddress,
  decimals,
}: ApproveButtonProps) => {
  const { chainId, address } = LotteryEnv;
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    chainId,
    args: [address, BigNumber.from(100).mul(BigNumber.from(10).pow(decimals))],
  });

  const { data, isLoading: isWriteLoad, write } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      {isLoading || isWriteLoad ? (
        <button
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed]"
          //   onClick={onSubmit}
        >
          Loading...
        </button>
      ) : (
        <button
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed]"
          disabled={!write}
          onClick={() => write?.()}
        >
          Enable
        </button>
      )}
    </>
  );
};
