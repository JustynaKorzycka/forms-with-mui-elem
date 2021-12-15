export const useAddItem = async (src, newItem, allItems, setItems) => {
  newItem.id = allItems[allItems.length - 1].id + 1;
  const res = await fetch(src, {
    method: "POST",
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  const data = await res.json();
  setItems([...allItems], data);
}
