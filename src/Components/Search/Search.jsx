import { useCallback, useEffect, useRef, useState, useContext } from "react";
import debounce from 'lodash.debounce';
import './Search.scss';
import { AppContext } from "../../Layouts/MainLayout";

export const Search = () => {

  const {searchValue, setSearchValue} = useContext(AppContext);
  const [value, setValue] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const putSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value)
    }, 400), [])

  const changeSearchInput = () => {
    putSearchValue(searchRef.current.value)
    setValue(searchRef.current.value);
  }

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    searchRef.current.focus();
  }

  return (
    <div className="search">
      <input
        ref={searchRef}
        value={value}
        onChange={changeSearchInput}
        type="text"
        className="search__text"
        placeholder="search..."
      />
      <div onClick={onClickClear} className="search__clear"></div>
    </div>
  )
}