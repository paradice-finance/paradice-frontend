export interface LotteryInfo {
  lotteryID: number;
  lotteryStatus: number;
  lotteryAddress: string;
  tokenAddress: string;
  sizeOfLottery: number;
  ticketPrice: number;
  winningTicketId: number;
  currecyDecimals: number;
  currency: string;
}

export interface UserTicket {
  numbers: Array<string>;
}
export const LotteryEnv = {
  address: process.env.LOTTERY_ADDRESS,
  chainId: Number(process.env.CHAIN_ID),
};
