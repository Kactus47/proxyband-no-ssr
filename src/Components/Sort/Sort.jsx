import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../../Layouts/MainLayout";
import "./Sort.scss";

export const Sort = () => {

  const {sortValue, setSortValue} = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false); 
  const [indexSort, setIndexSort] = useState(null);
  const refClick = useRef(null);
  const sortItem = [
    {
      name: 'User name (DESC)',
      sortType: 'desc'
    },
    {
      name: 'User name (ASC)',
      sortType: 'asc'
    }
  ]

  useEffect(() => {
    const currentSortIndex = sortItem.findIndex(item => item.sortType === sortValue);
    if(currentSortIndex > 0) {
      setIndexSort(currentSortIndex);
    }
  }, []);
  
  useEffect(()=> {
    document.addEventListener('mousedown', (e) => {
      if (refClick.current && !refClick.current.contains(e.target)) {
        setIsVisible(false);
      }
    })
  }, [isVisible])


  const chekedSort = (index) => {
    setIsVisible(!isVisible);
    setIndexSort(index);
    setSortValue(sortItem[index].sortType)
  }
  
  return (
    <div ref={refClick} className="sort">
      <div className="sort__label">
        <b>Sort by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>
          { (indexSort === null) ? 'Change' : sortItem[indexSort].name }    
        </span>
      </div>
      {
        isVisible && 
        <div className="sort__popup">
          <ul>
            {
              sortItem.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => chekedSort(index)}
                    className={indexSort === index ? 'active' : ''}
                  >
                    {item.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}