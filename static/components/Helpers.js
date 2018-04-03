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

export function range(min, max) {
  let length = max - min + 1;
  let result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = min + i;
  }
  return result;
};
