import React from 'react';
import {
  FaExchangeAlt,
  FaPaperPlane,
  FaWallet,
  FaChartLine,
} from 'react-icons/fa';

const QuickActionButton = ({ icon, label, onClick }) => (
  <button
    className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 p-4 rounded-lg"
    onClick={onClick}
  >
    <div className="text-xl mb-1">{icon}</div>
    <span className="text-xs">{label}</span>
  </button>
);

const QuickActions = ({ sdk, address }) => {
  const handleSend = async () => {
    // Implement send functionality
    console.log('Send functionality not implemented yet');
  };

  const handleReceive = () => {
    alert(`Your receive address is: ${address}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6  py-2">
      <QuickActionButton icon={<FaExchangeAlt />} label="Swap" />
      <QuickActionButton
        icon={<FaPaperPlane />}
        label="Send"
        onClick={handleSend}
      />
      <QuickActionButton
        icon={<FaWallet />}
        label="Receive"
        onClick={handleReceive}
      />
      <QuickActionButton icon={<FaChartLine />} label="Trade" />
    </div>
  );
};

export default QuickActions;
