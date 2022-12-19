import { useEffect, useState } from "react";
import { Button } from "ui";

export default function Docs() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (ready &&
    <div>
      <h1>Docs {process.env.WALLETCONNECT_PROJECT_ID}</h1>
      <Button />
    </div>
  );
}
