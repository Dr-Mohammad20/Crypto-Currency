import axios from "axios";
const BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const getCoins = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const getCoinData = async (id) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );
  return response.data;
};

const ChartCoins = async (id) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
  );
  return response.data;
};

export { getCoins, ChartCoins, getCoinData };
