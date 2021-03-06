import "./Header.scss";

import React from "react";
import { connect } from "react-redux";
import { setActiveLanguage } from "../../redux/language-reducer";

const Header: React.FC = (props: any) => {
    //TODO change event
  const handleClick = (event: any) => {
      props.setActiveLanguage(event.target.firstChild.data);
  };
  return (
    <div className="header">
      <button onClick={handleClick}>ru</button>
      <button onClick={handleClick}>en</button>
    </div>
  );
};

let mapStateToProps = (state: { activeLanguage: any }) => {
  return {
    activeLanguage: state.activeLanguage,
  };
};

export default connect(mapStateToProps, {
  setActiveLanguage,
})(Header);
