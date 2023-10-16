import { NavLink, } from "react-router-dom";
import "./UserItem.scss";
import { useContext } from "react";
import { AppContext } from "../../Layouts/MainLayout";

export const UserItem = ({id, name}) => {
  const {setSearchValue, setSortValue} = useContext(AppContext);

  const handleClearSearchParams = () => {
    setSearchValue('');
    setSortValue('');
  };
  return (
    <div className="user-item grid__item">
      <div className="user-item__name">{name}</div>
      <div className="user-item__links">
        <NavLink onClick={handleClearSearchParams} className="user-item__albums btn btn-gray" to={`/album/${id}`}>Albums</NavLink>
        <NavLink onClick={handleClearSearchParams} className="user-item__posts btn btn-blue" to={`/post/${id}`}>Рosts</NavLink>
      </div>
    </div>
  )
}