export interface LotteryInfo {
  lotteryID: number;
  lotteryStatus: number;
  lotteryAddress: string;
  tokenAddress: string;
  sizeOfLottery: number;
  ticketPrice: number;
  winningTicketId: number;
  currencyDecimals: number;
  currency: string;
}

export interface UserTicket {
  tickets: Array<Ticket>;
}

export interface Ticket {
  ticketId: number;
  chosenNumber: string;
}

export const LotteryEnv = {
  address: "0x2E2E9Ba4B777936E0cCF240Bd3a50320520E5B13",
  chainId: Number(process.env.CHAIN_ID),
};
