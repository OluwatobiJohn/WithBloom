import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import cancel from "../../public/cancel.svg";
import coin from "../../public/coin.svg";
import exchange from "../../public/exchange.svg";

interface SidebarProps {
  isOpen: boolean;
  toggleOut: () => any;
  isMobile: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleOut, isMobile }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if the "For Coins" and "For Exchange Rate" links are active
  const isForCoinsActive = pathname === "/forcoins";
  const isForExchangeActive = pathname === "/forexchange";

  return (
    <>
      <div
        className={
          isMobile
            ? `block md:hidden fixed w-64 h-screen bg-gray-800 shadow-md transition-transform ${
                isOpen
                  ? "transform translate-x-0"
                  : "transform -translate-x-full"
              }`
            : "fixed hidden md:block bg-gray-800 text-white w-64 min-h-screen"
        }
        // className={`${isMobile ? ``}`}
        style={{ marginTop: "4.5rem" }}
      >
        <ul className="pt-5">
          <Link href="/forcoins" onClick={() => toggleOut()}>
            <li
              className={`flex flex-row items-center gap-3 p-3 hover:bg-slate-500 ${
                isForCoinsActive ? "bg-blue-500" : ""
              }`}
            >
              <Image src={coin} height={25} width={25} alt="logo" />

              <span>For Coins</span>
            </li>
          </Link>
          <Link href="/forexchange" onClick={() => toggleOut()}>
            <li
              className={`flex flex-row items-center gap-3 p-3 hover:bg-slate-500 ${
                isForExchangeActive ? "bg-blue-500" : ""
              }`}
            >
              <Image src={exchange} height={25} width={25} alt="logo" />

              <span>For Exchange Rate</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
