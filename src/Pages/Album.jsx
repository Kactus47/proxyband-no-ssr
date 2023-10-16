import { useContext, useEffect, useState } from "react";
import { AlbumItem } from "../Components/AlbumItem/AlbumItem";
import { useParams } from 'react-router-dom';
import { Filters } from "../Components/Filters/Filters";
import { getData } from "../utils/getData";
import { filterItems } from "../utils/filterItem";
import { AppContext } from "../Layouts/MainLayout";


export function Album() {

  const { sortValue, searchValue } = useContext(AppContext);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Loading...')
  let albumId = useParams();
  
  useEffect(() => {
    const getAlbum = async () => {
      try{
        const albumsList = await getData(`https://jsonplaceholder.typicode.com/albums?userId=${albumId.id}`);
        setAlbums(albumsList);
        setIsLoading(true);
      }
      catch(errow) {
        setLoadingStatus('Error Loading...');
      }
    }
    getAlbum();
  }, [albumId.id])

  const filterAlbumsItem = filterItems(albums, searchValue, sortValue, 'title')

  useEffect(() => {
    if(filterAlbumsItem.length === 0 && isLoading) {
      setLoadingStatus('No results were found for your query')
    }
  }, [filterAlbumsItem, isLoading])

  return (
    <>
      <Filters />
      <h1>Albums user</h1>
      <div className="album-list grid">
        {
          (filterAlbumsItem.length === 0) ? 
          loadingStatus : 
          filterAlbumsItem.map(album => (
            <AlbumItem 
              key={album.id} 
              title={album.title} 
            />
          ))
        }    
      </div>  
    </>
  );
}
