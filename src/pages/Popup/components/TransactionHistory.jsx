import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionItem = ({ type, amount, address, timestamp }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-800">
    <div className="flex items-center">
      {type === 'sent' ? (
        <FaArrowUp className="text-red-500 mr-2" />
      ) : (
        <FaArrowDown className="text-green-500 mr-2" />
      )}
      <div>
        <p className="font-semibold">{type === 'sent' ? 'Sent' : 'Received'}</p>
        <p className="text-xs text-gray-400">{address}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{amount} ETH</p>
      <p className="text-xs text-gray-400">
        {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  </div>
);

const TransactionHistory = ({ sdk, address }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (sdk && address) {
        // In a real app, you'd fetch this from the SDK or an external API
        // For now, we'll use mock data
        const mockTransactions = [
          {
            type: 'sent',
            amount: '0.1',
            address: '0x1234...5678',
            timestamp: Date.now() - 3600000,
          },
          {
            type: 'received',
            amount: '0.5',
            address: '0x8765...4321',
            timestamp: Date.now() - 86400000,
          },
        ];
        setTransactions(mockTransactions);
      }
    };

    fetchTransactions();
  }, [sdk, address]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
      {transactions.map((tx, index) => (
        <TransactionItem key={index} {...tx} />
      ))}
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg mt-4">
        View All Transactions
      </button>
    </div>
  );
};

export default TransactionHistory;
