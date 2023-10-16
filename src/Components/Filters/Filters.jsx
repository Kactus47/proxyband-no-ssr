import { Search } from "../Search/Search";
import { Sort } from "../Sort/Sort";
import './Filters.scss';

export const Filters = () => {

  return(
    <div className="filters">
      <Search />
      <Sort />
    </div>
  )
}