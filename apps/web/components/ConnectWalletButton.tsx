import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { SiweMessage } from "siwe";
import { Web3Button, useWeb3ModalNetwork } from "@web3modal/react";

const ConnectWalletButton = () => {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { selectedChain } = useWeb3ModalNetwork();

  useEffect(() => {
    if (!address) {
      if (selectedChain?.id) {
        handleLogin();
      } else {
        handleLogout();
      }
    }
  }, [selectedChain]);

  const handleLogin = async () => {
    try {
      if (!address) return;
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with MetaMask to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: selectedChain?.id,
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
      signIn("credentials", credentials);
    } catch (error) {
      window.alert(error);
    }
  };

  const handleLogout = async () => {
    await disconnectAsync();
    await signOut({ redirect: false });
  };

  return <Web3Button />;
};

export default ConnectWalletButton;
