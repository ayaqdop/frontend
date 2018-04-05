function isNumericColumn(column) {
  return column === 0 || column === 25;
}
function isAlphaRow(row) {
  return row  === 0 || row === 17;
}

function convertToLetter(number) {
  const rows = " abcdefghijklmnop ";
  return rows.charAt(number);
}

export function calculateDescription(column, row) {
  let result = "";
  if (!isNumericColumn(column) && isAlphaRow(row)){
      result = column;
    } else if (isNumericColumn(column)){
      result = convertToLetter(row);
    }
  return result;
};

export function range(first, last) {
  let result = [first];
  let next = first <= last ? 1 : -1;
  for (let i = 0; i < Math.abs(last - first); i++) {
    result.push(result[result.length - 1] + next);
  }
  return result;
};
