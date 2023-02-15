export interface ModalState {
  order: number[];
  tickets: {
    [key: number]: {
      value: string;
      isWiggle: boolean;
    };
  };
}
