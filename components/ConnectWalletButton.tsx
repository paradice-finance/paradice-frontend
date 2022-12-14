import { Button } from 'antd';
import { Connector, useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { SiweMessage } from 'siwe';
import { verifyMessage } from 'ethers/lib/utils.js';

const ConnectWalletButton = () => {
  const session = useSession();
  const { connector: activeConnector, isConnected } = useAccount();
  const [connector, setConnector] = useState<Connector | undefined>();
  const { data: connectData, connectAsync, connectors, isLoading, pendingConnector
  } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const recoveredAddress = useRef({});
  const { signMessageAsync } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  useEffect(() => {
    const metaMaskConnector = activeConnector || connectors.find((c) => c.id === 'metaMask');
    setConnector(metaMaskConnector);
  }, []);

  const handleLogin = async () => {
    try {
      let connected;
      let connectAddress = connectData?.account || address;
      if (!isConnected) {
        connected = await connectAsync({ connector });
        connectAddress = connected?.account;
      }
      const callbackUrl = '/protected';
      const message = new SiweMessage({
        domain: window.location.host,
        address: connectAddress,
        statement: 'Sign in with MetaMask to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: connectData?.chain.id || chain?.id || connected?.chain.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      const credentials = {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      };
      signIn('credentials', credentials);
    } catch (error) {
      window.alert(error);
    }
  };

  const handleLogout = async () => {
    await disconnectAsync();
    await signOut({ redirect: false });
  };

  return (
    <>
      <Button disabled={!connector?.ready}
        key={connector?.id}
        onClick={session.status == 'unauthenticated' ? handleLogin : handleLogout}
      >
        {session.status == 'unauthenticated' ? "Connect Wallet" : "Logout"}
        {!connector?.ready && " (unsupported)"}
        {isLoading && connector?.id === pendingConnector?.id && " (connecting)"}
      </Button>
    </>
  );
};

export default ConnectWalletButton;
