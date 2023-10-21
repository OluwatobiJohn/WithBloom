import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/helpers/firebase";
import useRates from "@/hooks/useRates";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import exchange from "../../public/exchangeblk.svg";

const ForExchange: React.FC = () => {
  const router = useRouter();
  const { loading, exchangeRates, fetchCoins } = useRates();

  const [fromCoin, setFromCoin] = useState("BNBBNB");
  const [toCoin, setToCoin] = useState("BNBBTC");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<any>(null);

  const calculateEquivalentValue = () => {
    if (fromCoin === toCoin) {
      toast.error("Cannot get exchange rate of Coin with Itself");
      return;
    }
    if (fromCoin in exchangeRates && toCoin in exchangeRates) {
      const rateFrom = exchangeRates[fromCoin].rate;
      const rateTo = exchangeRates[toCoin].rate;
      const equivalentValue =
        (amount / parseFloat(rateFrom)) * parseFloat(rateTo);
      console.log(equivalentValue);
      setResult(equivalentValue);
    } else {
      setResult(null);
    }
  };

  const handleInputChange = () => {
    setResult(null);
  };
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
    <div className="flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold text-black mt-5 mb-10">
        Exchange Rate Calculator
      </h1>
      <div className="p-4 rounded-lg shadow-md bg-white mx-auto w-[300px] max-w-[320px] md:max-w-[500px] md:w-[400px] mt-5 border-t-8 border-b-8 border-[#0E3A71]">
        {loading ? (
          <div className="my-20">
            <Spinner />
          </div>
        ) : (
          <div className="overflow-y-auto">
            <div className="flex flex-col justify-center items-center">
              <h2>Calculated Rate</h2>
              <div className="text-2xl md:text-3xl font-bold my-8 overflow-x-auto">
                {result !== null ? Number(result).toFixed(8) : "0"}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Amount:</label>
              <input
                type="number"
                className="w-full p-2 border font-bold font-2xl border-gray-300 rounded focus:outline-none"
                value={amount}
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value));
                  handleInputChange();
                }}
              />
            </div>
            <div className="flex flex-row justify-between items-center mt-10">
              <div className="mb-4">
                <label className="block mb-2">Convert from:</label>
                <select
                  className="max-w-[100px] sm:max-w-[150px] p-2 border border-gray-300 rounded focus:outline-none"
                  value={fromCoin}
                  onChange={(e) => {
                    setFromCoin(e.target.value);
                    handleInputChange();
                  }}
                >
                  {Object.keys(exchangeRates).map((coin) => (
                    <option key={coin} value={coin}>
                      {coin}
                    </option>
                  ))}
                </select>
              </div>
              <Image
                src={exchange}
                height={20}
                width={20}
                alt="logo"
                className="mt-4"
              />
              <div className="mb-4">
                <label className="block mb-2">Convert to:</label>
                <select
                  className="max-w-[100px] sm:max-w-[150px] p-2 border border-gray-300 rounded focus:outline-none"
                  value={toCoin}
                  onChange={(e) => {
                    setToCoin(e.target.value);
                    handleInputChange();
                  }}
                >
                  {Object.keys(exchangeRates).map((coin) => (
                    <option key={coin} value={coin}>
                      {coin}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-full my-10 bg-[#0E3A71] text-white p-2 rounded hover:bg-blue-600"
              onClick={calculateEquivalentValue}
            >
              Calculate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForExchange;
