import React, { useEffect, useState } from 'react';

const TokenItem = ({ symbol, name, balance, value }) => (
  <div className="flex items-center justify-between mt-2 py-4 bg-gray-800 rounded-xl px-4 border-gray-800">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gray-700 rounded-full mr-2"></div>
      <div>
        <p className="font-semibold text-base">{symbol}</p>
        <p className="text-xs text-gray-400">{name}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{balance}</p>
      <p className="text-xs text-gray-400">{value}</p>
    </div>
  </div>
);

const TokenList = ({ sdk, address }) => {
  const [tokens, setTokens] = useState([
    {
      symbol: 'Ethereum',
      name: 'ETH',
      balance: 2,
    },
    {
      symbol: 'Ethereum',
      name: 'ETH',
      balance: 2,
    },
    {
      symbol: 'Ethereum',
      name: 'ETH',
      balance: 2,
    },
    {
      symbol: 'Ethereum',
      name: 'ETH',
      balance: 2,
    },
  ]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (sdk && address) {
        // For demonstration, we'll use a static list. In a real app, you'd fetch this from the SDK
        const tokenList = [
          {
            symbol: 'ETH',
            name: 'Ethereum',
            balance: await sdk.getBalance(address),
          },
          // Add more tokens here
        ];
        setTokens(tokenList);
      }
    };

    fetchTokens();
  }, [sdk, address]);

  return (
    <div className="mb-6  py-2">
      {tokens.map((token, index) => (
        <TokenItem
          key={index}
          symbol={token.symbol}
          name={token.name}
          balance={token.balance}
          value={`$${(parseFloat(token.balance) * 2000).toFixed(2)}`} // Assuming 1 ETH = $2000
        />
      ))}
    </div>
  );
};

export default TokenList;
