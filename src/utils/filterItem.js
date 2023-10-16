export const filterItems = (items, searchValue, sortValue, nameAttribute) => {
  let filteredItems = [...items];
  
  if (searchValue !== '') {
    filteredItems = filteredItems.filter(item =>
      item[nameAttribute].toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (sortValue !== '') {
    filteredItems.sort((valueA, valueB) => {
      if (sortValue === 'asc') {
        return valueA[nameAttribute].localeCompare(valueB[nameAttribute]);
      } else {
        return valueB[nameAttribute].localeCompare(valueA[nameAttribute]);
      }
    });
  }

  return filteredItems;
};