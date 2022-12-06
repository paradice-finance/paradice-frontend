import { useNetwork, useSwitchNetwork } from "wagmi";

export function UseSwirchNetwork() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      <div className=" bg-green-100">
        {chain && <div>Connected to {chain.name}</div>}

        {chains.map((x) => (
          <button
            className=" p-4 m-4 bg-slate-400"
            // disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            {x.name}
            {isLoading && pendingChainId === x.id && " (switching)"}
          </button>
        ))}

        <div>{error && error.message}</div>
      </div>
    </>
  );
}
