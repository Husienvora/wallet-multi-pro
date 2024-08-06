import React, { useEffect, useState } from 'react';
import WalletSDK from '../../sdk/Wallet';
import Header from './components/Header';
import AccountOverview from './components/AccountOverview';
import QuickActions from './components/QuickActions';
import TokenList from './components/TokenList';
import TransactionHistory from './components/TransactionHistory';
import { WalletContextProvider, useWallet } from './context/context';
import NetworkSelector from './components/NetworkSelector';
import Settings from './components/SettingsComponent';
import LeftNav from './components/leftNav';
const PopupContent = () => {
  const [sdk, setSdk] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState('mainnet');
  const { sidePanel, setSidePanel } = useWallet();

  useEffect(() => {
    const initializeSDK = async () => {
      const newSdk = new WalletSDK();
      setSdk(newSdk);
    };

    initializeSDK();
  }, []);

  useEffect(() => {
    // Prevent scrolling on the body when sidePanel is open
    if (sidePanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidePanel]);

  const connectWallet = async (privateKey) => {
    if (sdk) {
      try {
        const newAddress = sdk.importPrivateKey(privateKey);
        setAddress(newAddress);
        setIsConnected(true);
        await fetchBalance(newAddress);
      } catch (error) {
        console.error('Error importing account:', error);
        alert('Invalid private key. Please try again.');
      }
    }
  };

  const fetchBalance = async (addr) => {
    if (sdk && addr) {
      try {
        const balanceInEther = await sdk.getBalance(addr);
        setBalance(balanceInEther);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  const changeNetwork = (newNetwork) => {
    if (sdk) {
      sdk.setNetwork(newNetwork);
      setNetwork(newNetwork);
      fetchBalance(address);
    }
  };

  return (
    <>
      <div
        className={`w-full h-full flex flex-col bg-gray-900 text-white transition-all duration-300 ${
          sidePanel ? '*:blur-sm pointer-events-none' : ''
        }`}
      >
        <Header isConnected={isConnected} />
        <div className="flex-grow overflow-y-auto p-4 pb-16 no-scrollbar">
          <AccountOverview
            address={address}
            balance={balance}
            isConnected={isConnected}
          />
          <QuickActions sdk={sdk} address={address} />
          <TokenList sdk={sdk} address={address} />
        </div>
        <Settings sdk={sdk} />
      </div>
      <LeftNav />
      {sidePanel && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setSidePanel(false)}
        />
      )}
    </>
  );
};

const Popup = () => {
  return (
    <WalletContextProvider>
      <PopupContent />
    </WalletContextProvider>
  );
};

export default Popup;
