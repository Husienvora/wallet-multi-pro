import React from 'react';
import { FaCog } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiCopy } from 'react-icons/fi';
import { useWallet } from '../context/context';
const Header = ({ isConnected }) => {
  const { sidePanel, setSidePanel } = useWallet();
  return (
    <header className="fixed bg-gray-800 py-1  text-white h-12 flex flex-row  w-full">
      <div className="flex flex-row items-center justify-center  w-full">
        <div
          onClick={() => {
            setSidePanel(!sidePanel);
          }}
          className="flex items-center cursor-pointer absolute left-3 top-3.5  justify-center"
        >
          <RxHamburgerMenu size={20} />
        </div>

        <div className="w-full flex flex-row items-center justify-center  ">
          <div class="w-8 h-8 text-xs font-semibold rounded-full bg-gray-900 flex justify-center items-center">
            A1
          </div>
          <span class="ml-2 text-lg font-semibold">Account 1</span>
          <div class="ml-2 flex items-center justify-center ">
            <FiCopy />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
