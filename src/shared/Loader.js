import React, { useState } from 'react';
import style from '../asset/Styles/Loader.module.css';

function Loader() {
  const [timeOut, setTimeOut] = useState(false);
  setTimeout(() => setTimeOut(true), 15000);
  return timeOut ? (
    <h3>
      Sorry there is a problem to fetching data, Please Refresh the page and try
      again.
    </h3>
  ) : (
    <span className={style.Loader}></span>
  );
}

export default Loader;
