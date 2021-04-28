export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // console.log(items.slice(startIndex, startIndex + pageSize));
  return items.slice(startIndex, startIndex + pageSize);
}
