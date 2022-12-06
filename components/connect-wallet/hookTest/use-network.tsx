import { useNetwork } from "wagmi";

export function UseNetwork() {
  const { chain, chains } = useNetwork();

  return (
    <div className=" bg-pink-50 m-10">
      <h1>UseNetwork</h1>
      {chain && <div>Connected to {chain.name}</div>}
      {chains && (
        <div>Available chains: {chains.map((chain) => chain.name)}</div>
      )}
    </div>
  );
}
