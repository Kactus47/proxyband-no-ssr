import { useContext, useEffect, useState } from "react";
import { UserItem } from "../UserItem/UserItem"
import { AppContext } from "../../Layouts/MainLayout";
import { getData } from "../../utils/getData";
import { filterItems } from "../../utils/filterItem";


export const UserList = () => {

  const { sortValue, searchValue } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Loading...')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await getData('https://jsonplaceholder.typicode.com/users');
        setUsers(usersList);
        setIsLoading(true);
      }
      catch (errow) {
        setLoadingStatus('Error Loading...');
      }
    }
    getUsers();
  }, [])

  const filterUserItem = filterItems(users, searchValue, sortValue, 'name')
  
  useEffect(() => {
    if(filterUserItem.length === 0 && isLoading) {
      setLoadingStatus('No results were found for your query')
    }
  }, [filterUserItem, isLoading])

  return (
    <>
      <h1 className="title">User List</h1>
      <div className="user-list grid">
        {
          (filterUserItem.length === 0) ?
            loadingStatus :
            filterUserItem.map(user => (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                website={user.website}
              />
            ))
        }
      </div>
    </>

  )
}