import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import logo from "../../public/logo.svg";
import logosm from "../../public/logosm.svg";
import logout from "../../public/logout.svg";
import dropdown from "../../public/dropdown.svg";
import Image from "next/image";
import { auth } from "@/helpers/firebase";

interface TopBarProps {
  handleLogOut: () => any;
  toggleMobile: () => any;
}
const TopBar: React.FC<TopBarProps> = ({ handleLogOut, toggleMobile }) => {
  const [currentUser, setCurrentUser] = useState<any>("");

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      console.log(user);
      setCurrentUser(user);
    });
  }, []);
  return (
    <div className="bg-white p-4 text-white fixed top-0 left-0 w-full shadow-2xl h-[70px]">
      <div className="flex flex-row items-center justify-between">
        {/* Logo */}

        <Image
          src={logo}
          height={100}
          width={200}
          alt="logo"
          className="hidden md:block"
        />
        <Image
          src={dropdown}
          height={30}
          width={30}
          alt="logo"
          className="block md:hidden"
          onClick={() => toggleMobile()}
        />
        <Image
          src={logosm}
          height={50}
          width={50}
          alt="logo"
          className="block md:hidden"
        />
        <div className="flex flex-row">
          <span className="text-black truncate hidden md:block md:max-w-[200px] lg:w-full lg:max-w-full">
            {currentUser?._delegate?.email.split("@")[0]}
          </span>
          <div className="flex flex-row gap-2" onClick={() => handleLogOut()}>
            <Image
              src={logout}
              height={25}
              width={25}
              alt="logo"
              className=""
            />
            <span className="text-black mr-5 hidden md:block">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
