import { useAccount } from "wagmi";
import { ClaimFunction } from "./claim";

export default function Claim() {
  const { address } = useAccount();
  return <ClaimFunction walletAddress={address} />;
}
