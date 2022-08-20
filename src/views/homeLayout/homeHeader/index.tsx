import React from "react";
import './index.less'
const logo =require('../../../../common/assets/image/logo.jpeg');

const HomeHeader = () => {
  return (
    <div className="home-header-wrapper">
      <div className="logo">
            <img className="logo-content" src={logo}/>
      </div>
      <div className="menu-wrapper"></div>
    </div>
  );
};

export default HomeHeader;
