import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/helpers/firebase";
import useRates from "@/hooks/useRates";
import Spinner from "../components/Spinner";

const ForCoins: React.FC = () => {
  const { loading, coins, fetchCoins } = useRates();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");

  // Filter items based on search input
  const filteredItems = coins.filter((item) => {
    return item.includes(searchInput);
  });

  useEffect(() => {
    // setLoading(true);
    auth.onAuthStateChanged((user) => {
      // setCurrentUser(user);
      if (!user) router.push("/login");
      // setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black mt-5 mb-5">All Coins</h1>
      <div className="text-gray-600">
        <input
          type="search"
          name="search"
          placeholder="Enter Coin to Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border border-black mb-5"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
        />
      </div>
      <div className="p-4 rounded-lg shadow-md bg-white mx-auto w-[280px] max-w-[320px] md:max-w-[500px] md:w-[400px] border-t-8 border-b-8 border-[#0E3A71]">
        {loading ? (
          <div className="my-20">
            <Spinner />
          </div>
        ) : (
          <ul
            className="flex flex-col overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 17rem)" }}
          >
            {filteredItems != null &&
              filteredItems.map((rate: string, index: number) => {
                return (
                  <li className="text-black p-2" key={index}>
                    {rate}
                  </li>
                );
              })}
          </ul>
        )}
        {filteredItems.length === 0 && !loading && (
          <span className="text-black">No Coins Found</span>
        )}
      </div>
    </div>
  );
};

export default ForCoins;
