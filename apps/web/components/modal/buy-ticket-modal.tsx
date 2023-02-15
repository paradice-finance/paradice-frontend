import Modal from "../../components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  Fragment, useEffect, useRef, 
} from "react";
import { ModalState } from "./modalState";
import { InputTicket } from "./number-input";
import { BuyTicketButton } from "./buy-button";
import { ApproveButton } from "./approve-button";
import useSWR from "swr";
import { WalletBalance } from "../type";
import { fetcher } from "../../lib/utils";
import { constants } from "ethers";

interface ModalBuyTicketProps {
  pricePerTicket: number;
  remainTicket: number;
  currencyDecimals: number;
  tokenAddress: string;
  currency: string;
  onCloseModal: () => void;
}
const BuyTicketModal = ({
  showBuyTicketModal,
  setShowSignInModal,
  remainTicket,
  currency,
  currencyDecimals,
  tokenAddress,
  pricePerTicket
}: {
  showBuyTicketModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  remainTicket: number;
  currency: string;
  currencyDecimals: number;
  tokenAddress: string;
  pricePerTicket: number;
}) => {
    const initialState: ModalState = {
    order: [0],
    tickets: { "0": { value: "0", isWiggle: false } },
  };

const [price, setPrice] = useState(0);
  const [lotteryState, setLotteryState] = useState<ModalState>(initialState);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [userAllowance, setUserAllowance] = useState<number>(0);
  const refIBoxArray = useRef([]);
  const [remain, setRemain] = useState<number>(0)
   const { data: wallet, error: walletError } = useSWR<WalletBalance>(
    `api/sc/token/${tokenAddress}`,
    fetcher,
    {
      refreshInterval: 5 * 1000,
    }
  );

    useEffect(() => {
    setRemain(remainTicket)
    setPrice(lotteryState.order.length * pricePerTicket);
    if (wallet?.balance) {
      setUserBalance(wallet?.balance);
    }
    if (wallet?.allowance) {
      setUserAllowance(wallet?.allowance);
    }
  }, [wallet?.balance, wallet?.allowance,lotteryState, pricePerTicket, remain]);


  
  const updatelotteryState = (
    key: number,
    value: string,
    isWiggle: boolean
  ) => {
    const s = lotteryState;
    s.tickets[key] = { value, isWiggle };
    setLotteryState((lotteryState) => ({
      ...lotteryState,
      tickets: s.tickets,
    }));
  };

  const scollToInputBox = (key: number) => {
    refIBoxArray.current[key].scrollIntoView({
      block: "center",
    });

    updatelotteryState(key, lotteryState.tickets[key].value, true);
  };

  const setLotteryNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    updatelotteryState(key, event.target.value, false);
  };

  const addInputTicket = () => {
    if (lotteryState.order.length < remainTicket) {
      let idx: number;
      if (lotteryState.order.length === 0) {
        idx = 0;
      } else {
        idx = lotteryState.order[lotteryState.order.length - 1] + 1;
      }
      lotteryState.order.push(idx);
      updatelotteryState(idx, "0", false);
    }
  };

  const removeInputTicket = (key: number) => {
    var filtered = lotteryState.order.filter(function (value, index, arr) {
      return value !== key;
    });
    delete lotteryState.tickets[key];
    refIBoxArray.current.splice(key, 1);
    setLotteryState((lotteryState) => ({ ...lotteryState, order: filtered }));
  };

  const handleAnimationEnd = (key: number) => {
    updatelotteryState(key, lotteryState.tickets[key].value, false);
  };

  let inputRender = lotteryState.order.map((idx) => (
    <Fragment key={idx}>
      <div
      className="w-full border-transparent"
        ref={(ref) => {
          refIBoxArray.current[idx] = ref;
        }}
      >
        <InputTicket
          onAnimationEnd={handleAnimationEnd}
          isDisableRemove={lotteryState.order.length === 1}
          isWiggle={lotteryState.tickets[idx].isWiggle}
          index={idx}
          onChange={setLotteryNumber}
          onDelete={removeInputTicket}
        />
      </div>
    </Fragment>
  ));

  return (
    <Modal showModal={showBuyTicketModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 p-10 bg-white">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200  px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">Buy Ticket</h3>
          <p className="text-sm text-gray-500">
            Available ticket amount : {remain}
          </p>
        </div>
 <div className=" items-center mb-6 border-b-2 pb-3">
            <div className="w-full bg-white">{inputRender}</div>
            <button
              className="w-full bg-lime-500 hover:bg-lime-300 text-white rounded-md disabled:bg-gray-300"
              onClick={addInputTicket}
              disabled={lotteryState.order.length >= remainTicket}
            >
              +
            </button>
          </div>
          <div className="flex justify-between">
            <div className="inline-block text-sm  overflow-hidden">
              You allowance :
            </div>
            <div className="overflow-hidden inline-block text-[15px]">
              {userAllowance} {currency}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="inline-block text-sm  overflow-hidden">
              You balance :
            </div>
            <div className="overflow-hidden inline-block text-[15px]">
              {userBalance} {currency}
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" inline-block text-sm ">Your ticket amount :</div>
            <div className=" inline-block text-sm">
              {lotteryState.order.length}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="inline-block text-sm ">Total price :</div>
            <div className="inline-block text-m text-[#280D5F]">
              {price} {currency}
            </div>
          </div>
      <div className="w-full flex items-center justify-center mb-2 p-5">
            {userAllowance >= pricePerTicket  ? (
              <BuyTicketButton
                remainTicket={remainTicket}
                scollToInputBox={scollToInputBox}
                lottery={lotteryState}
                affiliateAddress={constants.AddressZero}
              />
            ) : (
              <ApproveButton tokenAddress={tokenAddress} decimals={currencyDecimals} />
            )}
          </div>
        </div>
        
   
    </Modal>
  );
};

export function useBuyTicketModal({ remainTicket,currency, currencyDecimals,tokenAddress,pricePerTicket} : ModalBuyTicketProps) {
  const [showBuyTicketModal, setShowBuyTicketModal] = useState(false);

  const BuyTicketModalCallback = useCallback(() => {
    return (
      <BuyTicketModal
        showBuyTicketModal={showBuyTicketModal}
        setShowSignInModal={setShowBuyTicketModal}
        remainTicket={remainTicket}
        currency={currency}
        currencyDecimals={currencyDecimals}
        tokenAddress={tokenAddress}
        pricePerTicket={pricePerTicket}
        
      />
    );
  }, [showBuyTicketModal, setShowBuyTicketModal]);

  return useMemo(
    () => ({ setShowBuyTicketModal, BuyTicketModal: BuyTicketModalCallback }),
    [setShowBuyTicketModal, BuyTicketModalCallback],
  );
}
