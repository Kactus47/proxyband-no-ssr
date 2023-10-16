import React, { createContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer } from "../Components/Footer/Footer";

export const AppContext = createContext();
export const MemoizedHeader = React.memo(Header);
export const MemoizedOutlet = React.memo(Outlet);
export const MemoizedFooter = React.memo(Footer);

export const MainLayout = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [sortValue, setSortValue] = useState(searchParams.get("name") || "" );
  const navigate = useNavigate();

  useEffect(() => {
    (searchValue !== "") ? searchParams.set("search", searchValue) : searchParams.delete("search");
    (sortValue !== "") ? searchParams.set("name", sortValue) : searchParams.delete("name");
    navigate(`?${searchParams.toString()}`);
  }, [searchValue, sortValue, searchParams, navigate]);

  return(
    <AppContext.Provider value={{
      searchParams,
      setSearchParams,
      searchValue,
      setSearchValue,
      sortValue,
      setSortValue
    }}>
      <div className="wrapper">
        <MemoizedHeader />
        <main className="content">

            <MemoizedOutlet />
          
        </main>
        <MemoizedFooter />
      </div>   
    </AppContext.Provider>
  )
}

