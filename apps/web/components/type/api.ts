export type RemainTicket = {
  remainTicket: number;
};

export type WalletBalance = {
  balance: number;
  allowance: number;
};

export type Tickets = {
    tickets : {
      roundId: string
      ticketId: number
      ticketNumber: number
      transactionDate: Date
      isWin: boolean,
      txHash: string
    }[]
  }

export type ErrorResponse = {
  error: string;
};
