import React from "react";
import "./App.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";

//components
import Home from "./components/HomePage";
import NotFound from "./components/NotFound";
import GreenCoins from "./components/GreenCoins";
import RedCoins from "./components/RedCoins";
import ShowCoin from "./components/ShowCoin";

//Logo
import logo2 from "./asset/Icon/logo2.png";

function App() {
  return (
    <div className="Container">
      <div className="LeftMenu">
        <div className="divLogo">
          <img className="Logo" src={logo2} alt="Logo" />
        </div>
        <div className="divMenu">
          <Link to="/">Home</Link>
          <Link to="/GreenCoins">Green coins</Link>
          <Link to="/RedCoins">Red Coins</Link>
        </div>
      </div>
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/GreenCoins" element={<GreenCoins />}></Route>
          <Route path="/RedCoins" element={<RedCoins />}></Route>
          <Route path="/ShowCoin/:id" element={<ShowCoin />}></Route>
          <Route path="/NotFound" element={<NotFound />}></Route>
          <Route path="/*" element={<Navigate to="/NotFound" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
