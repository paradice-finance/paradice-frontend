import useSWR from "swr";
import { ClaimButton } from "./claim-button";

interface claimProps {
  walletAddress: string;
}
export function ClaimFunction({ walletAddress }: claimProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<{ winPrice: number[] }>(
    `api/sc/lottery/getWinPriceRounds/${walletAddress}`,
    fetcher,
    {
      refreshInterval: 5 * 1000,
    }
  );

  if (!data || data.winPrice.length === 0) {
    return <h1>No reward to cliam</h1>;
  }

  return <ClaimButton />;
}
