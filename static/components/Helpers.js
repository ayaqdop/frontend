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
export function calculateColor(column, row) {
  let result = "pitch-green-dark";

  if (!isNumericColumn(column) && !isAlphaRow(row)) {
    result = (column % 2 != row % 2)
      ? "pitch-green-dark"
      : "pitch-green-middle";
  }
  return result;
};
