import React from 'react';

const NetworkSelector = ({ currentNetwork, networks, onNetworkChange }) => {
  return (
    <div className="mb-4">
      <select
        className="bg-gray-800 text-white px-3 py-2 rounded-lg w-full"
        value={currentNetwork}
        onChange={(e) => onNetworkChange(e.target.value)}
      >
        {networks.map((network) => (
          <option key={network} value={network}>
            {network.charAt(0).toUpperCase() + network.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector;
