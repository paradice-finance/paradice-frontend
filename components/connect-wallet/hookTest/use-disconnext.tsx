import { useDisconnect } from "wagmi";

export function UseDisconnect() {
  const { disconnect } = useDisconnect();

  return (
    <button className=" p-5 bg-orange-300" onClick={() => disconnect()}>
      Disconnect
    </button>
  );
}
