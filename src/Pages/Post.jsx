import { useContext, useEffect, useState } from "react";
import { PostItem } from "../Components/PostItem/PostItem";
import { useParams } from 'react-router-dom';
import { Filters } from "../Components/Filters/Filters";
import { getData } from "../utils/getData";
import { filterItems } from "../utils/filterItem";
import { AppContext } from "../Layouts/MainLayout";


export function Post() {

  const { sortValue, searchValue } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Loading...')
  let postId = useParams();
  
  useEffect(() => {
    const getAlbum = async () => {
      try{
        const postsList = await getData(`https://jsonplaceholder.typicode.com/posts?userId=${postId.id}`);
        setPosts(postsList);
        setIsLoading(true);
      }
      catch(errow) {
        setLoadingStatus('Error Loading...');
      }
    }
    getAlbum();
  }, [postId.id])

  const filterPostsItem = filterItems(posts, searchValue, sortValue, 'title')

  useEffect(() => {
    if(filterPostsItem.length === 0 && isLoading) {
      setLoadingStatus('No results were found for your query')
    }
  }, [filterPostsItem, isLoading])

  return (
    <>
      <Filters />
      <h1>Posts user</h1>
      <div className="post-list grid">
        {
          (filterPostsItem.length === 0) ? 
          loadingStatus : 
          filterPostsItem.map(post => (
            <PostItem 
              key={post.id}
              title={post.title}
            />
          ))
        }  
      </div>    
    </>
  );
}
