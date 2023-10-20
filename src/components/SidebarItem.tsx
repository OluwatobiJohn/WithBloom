import React from 'react';
import Link from 'next/link';

interface SidebarItemsProps {
  isForCoinsActive: boolean;
  isForExchangeActive: boolean;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ isForCoinsActive, isForExchangeActive }) => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <ul className="p-4">
        <li>
          <Link href="/forcoins">
            <a className={`block p-2 ${isForCoinsActive ? 'bg-blue-500' : ''}`}>For Coins</a>
          </Link>
        </li>
        <li>
          <Link href="/forexchange">
            <a className={`block p-2 ${isForExchangeActive ? 'bg-blue-500' : ''}`}>For Exchange Rate</a>
          </Link>
        </li>
        {/* Add other sidebar links here */}
      </ul>
    </div>
  );
};

export default SidebarItems;
