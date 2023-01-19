import { LotteryEnv } from "../type";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import lotteryABI from "../../public/abi/lottery.json";
import { ModalState } from "./modalState";

interface BuyTicketProps {
  remainTicket: number;
  lottery: ModalState;
  affiliateAddress: string;
  isUseAffiliate: boolean;
  scollToInputBox: (idx: number) => void;
}

export const BuyTicketButton = ({
  lottery,
  affiliateAddress,
  isUseAffiliate,
  scollToInputBox,
  remainTicket,
}: BuyTicketProps) => {
  const { chainId, address } = LotteryEnv;
  const lotteryNumbers = lottery.order.map((idx) =>
    parseInt(lottery.tickets[idx].value)
  );

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

  const onClick = () => {
    let condition = true;
    for (const idx of lottery.order) {
      if (lottery.tickets[idx].value.length < 6) {
        scollToInputBox(idx);
        condition = false;
        break;
      }
    }
    if (condition) {
      write?.();
    }
  };

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
          className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed] disabled:bg-gray-300"
          disabled={!write || remainTicket <= 0}
          onClick={() => onClick()}
        >
          Buy
        </button>
      )}
    </>
  );
};
