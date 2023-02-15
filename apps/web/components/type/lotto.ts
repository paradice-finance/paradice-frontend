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
  address: process.env.LOTTERY_ADDRESS,
  chainId: Number(process.env.CHAIN_ID),
};
