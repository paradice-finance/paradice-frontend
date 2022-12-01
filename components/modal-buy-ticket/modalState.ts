export interface ModalState {
  order: number[];
  tickets: {
    [key: number]: {
      value: number;
    };
  };
}
