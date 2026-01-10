import React from "react";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo from "./img/Hm_Logo 1.png";
// import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  return (
    <header className="header d-flex">
      <img className="h-100" src={Logo} alt="Handy Man Logo" />
      <div className="spacer"></div>
      {/* <div class="d-flex align-items-center gap-4">
 
        <div>
          <input
            type="text"
            className="form-control src_input"
            placeholder="Search / Ask a question"
          />
        </div>
        <div className="hdr_icns d-flex gap-4">
          <Tooltip title="Cart">
          <ShoppingBagIcon />
          </Tooltip>
          <Tooltip title="Account">
          <AccountCircleIcon /> 
          </Tooltip>
          <Tooltip title="Menu">
            <MoreVertIcon />
          </Tooltip>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
