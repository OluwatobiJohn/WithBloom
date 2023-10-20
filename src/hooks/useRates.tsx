import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useRates = () => {
  const [coins, setCoins] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const fetchCoins = () => {
    setLoading(true);
    axios({
      url: "https://staging-biz.coinprofile.co/v3/currency/rate",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data && response.status === 200) {
          console.log(response.data.data);
          response.data &&
            response.data.data &&
            response.data.data.rates &&
            setExchangeRates(response.data.data.rates);
          let rateObj =
            response.data &&
            response.data.data &&
            response.data.data.rates &&
            response.data.data.rates;
          rateObj = Object.keys(rateObj);
          setCoins(rateObj);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  return { loading, coins, exchangeRates, fetchCoins };
};

export default useRates;
