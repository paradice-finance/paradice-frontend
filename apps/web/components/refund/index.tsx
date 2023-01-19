import React, { Fragment, useEffect, useState } from "react";
import { UserTicket } from "../type";
import { Spin } from "antd";
import useSWR from "swr";
import { RefundButton } from "./refund-button";

interface Ticket {
  id: number;
  number: string;
}

interface Props {
  currency: string;
  pricePerTicket: number;
  walletAddress: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserTicket: React.FC<Props> = ({
  currency,
  pricePerTicket,
  walletAddress,
}) => {
  const [checkedTickets, setCheckedTickets] = useState<number[]>([]);
  const [tickets, setTicket] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRefund, setShowRefund] = useState(false);
  const {
    data: userTicket,
    error: userTicketError,
    mutate,
  } = useSWR<UserTicket>(
    `/api/sc/lottery/getUserTickets/${walletAddress}/current`,
    fetcher,
    {
      refreshInterval: 5 * 1000,
    }
  );

  useEffect(() => {
    if (userTicket !== undefined) {
      let ts: Ticket[] = [];
      userTicket.tickets.forEach((t) => {
        ts.push({ id: t.ticketId, number: t.chosenNumber });
      });
      setTicket(() => ts);
    }
  }, [userTicket]);

  if (userTicket === undefined) {
    return (
      <div className=" my-8  justify-self-center">
        <div className="block justify-self-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setCheckedTickets([...checkedTickets, id]);
    } else {
      setCheckedTickets(checkedTickets.filter((item) => item !== id));
    }
  };

  const setRefundZero = () => {
    setCheckedTickets([]);
    mutate(undefined, true);
  };

  const handleToggleCheckbox = () => {
    setShowRefund(!showRefund);
    setCheckedTickets([]);
  };

  return (
    <div className=" mt-5 w-full ">
      {tickets.length > 0 ? (
        <div>
          <ul>
            {tickets.map((item) => (
              <div key={item.id}>
                <div>
                  <li key={item.id}>
                    <div className="flex  m-3 items-center">
                      {/* CheckBox */}
                      <div>
                        {showRefund && (
                          <input
                            disabled={isLoading}
                            className=" w-8 h-8 mr-3 "
                            type="checkbox"
                            value={item.id}
                            onChange={handleCheckboxChange}
                            checked={checkedTickets.includes(item.id)}
                          />
                        )}
                      </div>
                      {/* Number */}
                      <div className=" text-5xl ml-3 mb-3">
                        {(() => {
                          if (item.number.length === 6) {
                            return item.number;
                          } else {
                            let number = item.number;
                            while (number.length < 6) {
                              number = "0" + number;
                            }
                            return number;
                          }
                        })()}
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            ))}
          </ul>

          <div className=" inline-block w-full ">
            <div className=" inline-block w-4/12 mr-5">
              <button
                disabled={isLoading}
                onClick={handleToggleCheckbox}
                className="border rounded-[16px] w-full py-2 text-white bg-[#37C7D4] mb-6 hover:bg-[#8ee5ed] disabled:bg-gray-300"
              >
                {showRefund ? "Back" : "Refund"}
              </button>
            </div>
            <div className=" inline-block w-4/12  ">
              {showRefund && (
                <div>
                  <RefundButton
                    refundIds={tickets
                      .filter((item) => checkedTickets.includes(item.id))
                      .map((item) => item.id)}
                    setRefundZero={setRefundZero}
                    setIsLoading={(b: boolean) => setIsLoading(b)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>no ticket</h1>
      )}
    </div>
  );
};

export default UserTicket;
