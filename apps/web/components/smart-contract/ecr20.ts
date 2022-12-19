import { erc20Read } from "./readContract";

export class ERC20 {
  token: string;

  constructor(address: string) {
    this.token = address;
  }

  async name() {
    return await erc20Read("name", this.token);
  }

  async balanceOf(address: string) {
    return await erc20Read("balanceOf", this.token, [address]);
  }
}
