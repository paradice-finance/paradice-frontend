import { useAccount } from "wagmi";

export function UseAccount() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className=" text-2xl text-red-900 m-10">{`Your Address :${address}`}</div>
  );
}
