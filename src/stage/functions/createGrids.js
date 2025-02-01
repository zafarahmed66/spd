const createGrids = (entries) => {
  const numOfRows = 10;
  if (entries && entries.length === 0) return [Array(numOfRows).fill(null)];
  let numOfAddRows = numOfRows - (entries.length % numOfRows);
  if (numOfAddRows === numOfRows) {
    numOfAddRows = 0;
  }
  let copy = [...entries];
  for (let j = 0; j < numOfAddRows; j++) {
    copy.push(null);
  }
  const grids = [];
  for (let i = 0; i < copy.length; i += numOfRows) {
    grids.push(copy.slice(i, i + numOfRows));
  }
  return grids;
};

export default createGrids;
