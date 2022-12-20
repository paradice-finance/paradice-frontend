import { Fragment, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ModalState } from "./modalState";
import { InputTicket } from "./number-input";
import { WalletBalance } from "../type";
import useSWR from "swr";

interface ModalBuyTicketProps {
  pricePerTicket: number;
  remainTicket: number;
  decimals: number;
  tokenAddress: string;
  currency: string;
  onCloseModal: () => void;
}

export function ModalBuyTicket({
  onCloseModal,
  pricePerTicket,
  tokenAddress,
  decimals,
  currency,
}: ModalBuyTicketProps) {
  const initialState: ModalState = { order: [0], tickets: {} };
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lotteryState, setLotteryState] = useState<ModalState>(initialState);
  const [userBalance, setUserBalance] = useState<number>(0);
  const { address } = useAccount();

  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

  const requestBody = {
    walletAddress: address,
  };

  const { data: wallet, error: walletError } = useSWR<WalletBalance>(
    `api/sc/tokenBalance/${tokenAddress}`,
    fetcher,
    {
      refreshInterval: 5 * 1000,
    }
  );
  useEffect(() => {
    setPrice(
      (lotteryState.order.length * pricePerTicket) / Math.pow(10, decimals)
    );
  }, [decimals, lotteryState, pricePerTicket]);

  useEffect(() => {
    if (wallet?.balance) {
      setUserBalance(wallet?.balance);
    }
  }, [wallet?.balance]);

  const setLotteryNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const s = lotteryState;
    s.tickets[key] = { value: Number(event.target.value) };
    setLotteryState((lotteryState) => ({
      ...lotteryState,
      tickets: s.tickets,
    }));
  };

  const addInputTicket = () => {
    let idx: number;
    if (lotteryState.order.length === 0) {
      idx = 0;
    } else {
      idx = lotteryState.order[lotteryState.order.length - 1] + 1;
    }
    const s = lotteryState;
    s.order.push(idx);
    s.tickets[idx] = { value: 0 };
    setLotteryState((lotteryState) => ({
      order: s.order,
      tickets: s.tickets,
    }));
  };

  const removeInputTicket = (key: number) => {
    var filtered = lotteryState.order.filter(function (value, index, arr) {
      return value !== key;
    });
    delete lotteryState.tickets[key];
    setLotteryState((lotteryState) => ({ ...lotteryState, order: filtered }));
  };

  let inputRender = lotteryState.order.map((idx) => (
    <Fragment key={idx}>
      <InputTicket
        isDisableRemove={lotteryState.order.length === 1}
        index={idx}
        onChange={setLotteryNumber}
        onDelete={removeInputTicket}
      />
    </Fragment>
  ));

  const onSubmit = async () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-slate-900/80 backdrop-blur-sm will-change-[opacity] text-[#9d92c7]">
      <div
        className="absolute overflow-hidden  bg-white border border-stone-200 rounded-t-[32px] w-full max-h-max z-50  min-h-max bottom-0
         md:max-w-[400px] md:relative md:rounded-[32px] md:m-auto md:mt-10 md:min-h-[200px] md:max-h-screen"
      >
        {/* header */}
        <div className="header flex items-center justify-between border-b px-3 py-6 bg-neutral-100">
          <div className=" text-[#280D5F] font-semibold">Buy Ticket</div>
          <button
            className=" text-[#7EDBE5] hover:text-[#bdeaef] text-[24px] mr-4"
            onClick={onCloseModal}
          >
            x
          </button>
        </div>
        {/* content */}
        <div className="content p-6 max-h-[400px] overflow-y-scroll ">
          {/* content input*/}
          <div className="items-center mb-6 border-b-2 pb-3">
            <div>{inputRender}</div>
            <button
              className="w-full bg-lime-500 hover:bg-lime-300 text-white rounded-full"
              onClick={addInputTicket}
            >
              +
            </button>
          </div>
          <div className="flex justify-between">
            <div className="inline-block text-sm  overflow-hidden">
              You Balance
            </div>
            <div className="overflow-hidden inline-block text-[15px]">
              {userBalance} {currency}
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" inline-block text-sm ">Your Ticket</div>
            <div className=" inline-block text-sm">
              {lotteryState.order.length} {"Tickets"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="inline-block text-sm ">You pay</div>
            <div className="inline-block text-m text-[#280D5F]">
              {price} {currency}
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            {loading ? (
              <button
                className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6"
                disabled
              >
                Loading
              </button>
            ) : (
              <button
                className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed]"
                onClick={onSubmit}
              >
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
