import React from 'react';

const AccountOverview = ({ address, balance, isConnected }) => (
  <div className="mb-4 mt-8 p-4 flex flex-col items-center justify-center ">
    <div className="text-white text-4xl mt-2 font-semibold  w-full flex items-center justify-center">
      $0.00
    </div>
    <div className="flex flex-row text-xl font-semibold mt-3 items-center justify-center  w-full">
      <div className="px-2 py-1 text-gray-600">+$0.00</div>
      <div className="py-1 px-2 bg-gray-800 rounded-lg  text-gray-600">
        +$0.00%
      </div>
    </div>
  </div>
);

export default AccountOverview;
