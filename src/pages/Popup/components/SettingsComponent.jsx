import React, { useState } from 'react';
import { FaLock, FaGasPump, FaLanguage, FaMoon } from 'react-icons/fa';
import { PiCurrencyCircleDollarFill } from 'react-icons/pi';
import { IoIosSwap } from 'react-icons/io';
import { RiLayoutGridFill } from 'react-icons/ri';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { LuGlobe } from 'react-icons/lu';
const SettingItem = ({ icon, title, description, onClick }) => (
  <div
    className="flex items-center justify-between py-3 border-b border-gray-800 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="text-xl mr-3">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
    <div className="text-gray-400">›</div>
  </div>
);

const Settings = ({ sdk }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSecurityClick = () => {
    // Implement security settings
    console.log('Security settings clicked');
  };

  const handleAdvancedClick = () => {
    // Implement advanced settings
    console.log('Advanced settings clicked');
  };

  const handleLanguageClick = () => {
    // Implement language settings
    console.log('Language settings clicked');
  };

  const handleThemeClick = () => {
    // Implement theme settings
    console.log('Theme settings clicked');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-0 left-0 right-0 w-full flex flex-row px-4  h-12 bg-gray-800  text-white py-2 cursor-pointer">
        <div className="flex items-center space-x-6 w-full justify-center  text-white">
          <button className="p-2 hover:bg-gray-700 rounded">
            <PiCurrencyCircleDollarFill size={28} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <RiLayoutGridFill size={28} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <IoIosSwap size={28} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <BsFillLightningChargeFill size={28} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <LuGlobe size={28} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <SettingItem
          icon={<FaLock />}
          title="Security"
          description="Manage your security preferences"
          onClick={handleSecurityClick}
        />
        <SettingItem
          icon={<FaGasPump />}
          title="Advanced"
          description="Gas settings and advanced options"
          onClick={handleAdvancedClick}
        />
        <SettingItem
          icon={<FaLanguage />}
          title="Language"
          description="Change the application language"
          onClick={handleLanguageClick}
        />
        <SettingItem
          icon={<FaMoon />}
          title="Theme"
          description="Switch between light and dark mode"
          onClick={handleThemeClick}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;
