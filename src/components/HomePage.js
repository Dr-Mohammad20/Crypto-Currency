import React, { useState, useEffect } from 'react';
import style from '../asset/Styles/Home.module.css';
import { getCoins } from '../services/Api';
import { Link } from 'react-router-dom';

// component
import Pagination from './Pagination';
import Loader from '../shared/Loader';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);

  ///////////////////pagination///////////////////
  //pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  ////////////////////////////////////////////////
  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = coins.slice(indexOfFirstPost, indexOfLastPost);
  /////////////////////////////
  // change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Get Coins data
  useEffect(() => {
    const loadData = async () => {
      const data = await getCoins();
      setCoins(data);
      setSelectedCoins(data[0]);
    };
    loadData();
  }, []);

  const clickHandler = (item) => {
    setSelectedCoins(item);
  };

  console.log(coins);

  return (
    <div className={style.Container}>
      <div className={style.LeftContent}>
        {currentPosts.length !== 0 ? (
          <>
            <div className={style.APIInfo}>
              {currentPosts.map((item, index) => (
                <div
                  className={style.Coins}
                  key={item.id}
                  onClick={() => clickHandler(item)}
                >
                  <div style={{ width: '5%' }}>
                    <p>
                      {index + 1 + (currentPage * postsPerPage - postsPerPage)}
                    </p>
                  </div>
                  <div>
                    <img
                      className={style.CoinImage}
                      src={item.image}
                      alt="CoinImage"
                    />
                  </div>
                  <div className={style.coinInApiName}>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p>{item.symbol}</p>
                  </div>
                  <div>
                    <p>{item.current_price} $</p>
                  </div>
                  <div>
                    <p
                      style={
                        item.price_change_percentage_24h > 0
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {item.price_change_percentage_24h}
                    </p>
                  </div>
                  <div>
                    <Link to={`/ShowCoin/${item.id}`}>Details...</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.PaginationContainer}>
              <Pagination
                postPerPage={postsPerPage}
                totalPosts={coins.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </>
        ) : (
          <div
            style={{
              height: '95dvh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        )}
      </div>

      <div className={style.RightContent}>
        <div className={style.SelectCoinLogo}>
          <img
            className={style.coinImage}
            src={selectedCoins.image}
            alt="CoinImage"
          />
        </div>
        <div className={style.SelectCoinInfo}>
          <p className={style.coinName}>Name : {selectedCoins.name}</p>
          <p>Symbol : {selectedCoins.symbol}</p>
          <p>Low Price In 24h: {selectedCoins.low_24h} $</p>
          <p>High Price In 24h: {selectedCoins.high_24h} $</p>
          <p>Current Price : {selectedCoins.current_price} $</p>
          <p
            style={
              selectedCoins.price_change_percentage_24h > 0
                ? { color: 'green' }
                : { color: 'red' }
            }
          >
            <span style={{ color: 'black' }}>
              Price Change Percentage In 24h :{' '}
            </span>
            {selectedCoins.price_change_percentage_24h}
          </p>

          <p>Market Rank : {selectedCoins.market_cap_rank}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
