import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinData } from '../services/Api';
import { Link } from 'react-router-dom';
import style from '../asset/Styles/ShowCoin.module.css';
import Loader from '../shared/Loader';

const ShowCoin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await getCoinData(id);
      setCoin(data);
      console.log(data);
    };
    loadData();
  }, [id]);
  return (
    <div className={style.Container}>
      {coin.length !== 0 ? (
        <>
          <div className={style.CoinImage}>
            <img
              className={style.coinLogo}
              src={coin.image.large}
              alt="image"
            />
          </div>
          <div className={style.CoinInfo}>
            <p>Name : {coin.name}</p>
            <p>Symbol : {coin.symbol}</p>
            <p>Rank : {coin.market_cap_rank}</p>
            <p>Current Price : {coin.market_data.current_price.usd} $</p>
            <p>
              Price Change In 24h :{' '}
              <span
                style={
                  coin.market_data.price_change_24h > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {coin.market_data.price_change_24h}
              </span>
            </p>
            <p>
              Price Change In 7 Days Ago :{' '}
              <span
                style={
                  coin.market_data.price_change_percentage_7d > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {coin.market_data.price_change_percentage_7d}
              </span>
            </p>
            <p className={style.Description}>
              Description : {coin.description.en}
            </p>
            <Link to="/">Back to Home</Link>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShowCoin;
