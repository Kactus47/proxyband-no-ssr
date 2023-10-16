export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error('Error loading....');
    }
    const users = await response.json();
    return users;
  } 
  catch(error) {
    throw error
  }
}
