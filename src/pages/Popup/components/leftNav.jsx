import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/context';
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io';
import { MdAdd, MdModeEditOutline } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';
import {
  IoAddOutline,
  IoPencilOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

const LeftNav = () => {
  const { sidePanel, setSidePanel } = useWallet();

  const accounts = [
    { id: 'A1', name: 'Account 1', color: 'bg-gray-700' },
    { id: 'A2', name: 'Account 2', color: 'bg-gray-700' },
    { id: 'A3', name: 'Account 3', color: 'bg-purple-600' },
  ];

  return (
    <motion.div
      className="left-2 top-3 rounded-2xl h-[calc(100vh-3.5vh)] z-30 w-20 flex items-center justify-center  bg-black fixed  flex-col"
      initial={{ x: '-200%' }}
      animate={{ x: sidePanel ? 0 : '-200%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-4 flex items-center">
        <button onClick={() => setSidePanel(false)} className="text-white">
          <FaArrowLeft size={19} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex flex-col justify-center  items-center  py-2"
          >
            <div
              className={`w-12 h-12 rounded-full ${account.color} text-base font-bold flex items-center justify-center text-white `}
            >
              {account.id}
            </div>
            <span className="text-nowrap text-gray-500 font-bold">
              {account.name}
            </span>
          </div>
        ))}
      </div>

      <div className="py-4 border-t flex flex-col items-center justify-center space-y-4 w-full border-gray-700">
        <button className="text-gray-400">
          <MdAdd size={28} className="font-bold" />
        </button>
        <button className="text-gray-400">
          <MdModeEditOutline size={25} />
        </button>
        <button className="text-gray-400">
          <IoIosSettings size={25} />
        </button>
      </div>
    </motion.div>
  );
};

export default LeftNav;
