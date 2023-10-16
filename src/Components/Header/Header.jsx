import { NavLink } from "react-router-dom";
import './Header.scss';
import { useContext } from "react";
import { AppContext } from "../../Layouts/MainLayout";

export const Header = () => {

  const {setSearchValue, setSortValue} = useContext(AppContext);

  const handleClearSearchParams = () => {
    setSearchValue('');
    setSortValue('');
  };

  return (
    <header className="header">
      <NavLink
        to='/'
        onClick={() => handleClearSearchParams()}
        className="header__logo"
      >
        Users Apps
      </NavLink>
    </header>
  );
};
