import React from 'react';
import { WagmiConfig } from 'wagmi';

import { client } from './connect-wallet/connector';

const WagmiProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  );
};

export default WagmiProvider;
