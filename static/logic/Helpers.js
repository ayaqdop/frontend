function isNumericColumn(column) {
  return column === MIN_COLUMN || column === MAX_COLUMN;
}
function isAlphaRow(row) {
  return row  === MIN_ROW || row === MAX_ROW;
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

export const MIN_COLUMN = 0;
export const MAX_COLUMN = 25;
export const MIN_ROW = 0;
export const MAX_ROW = 17;
