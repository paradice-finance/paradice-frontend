import { useEffect, useState } from "react";
import { ConnectWallet } from "../../components/connect-wallet/connector";

export default function Wallet() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    domLoaded && (
      <div>
        <ConnectWallet />
      </div>
    )
  );
}
