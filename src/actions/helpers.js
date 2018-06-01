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
}

export function range(first, last) {
  let result = [first];
  let next = first <= last ? 1 : -1;
  for (let i = 0; i < Math.abs(last - first); i++) {
    result.push(result[result.length - 1] + next);
  }
  return result;
}

export function removeSelf(all, fromPosition) {
  return all.filter(p => (p[0] !== fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] === fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] !== fromPosition[0] && p[1] === fromPosition[1]));
}

export function difference(fromPosition, toPosition) {
  let result = 0;
  
  const [fromX, fromY] = fromPosition;
  const [toX, toY] = toPosition;

  if (fromX === toX) {
    result = Math.abs(fromY - toY);
  } else if (fromY === toY) {
    result = Math.abs(fromX - toX);
  } else {
    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);

    result = Math.max(dx, dy);
  }

  return result;
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const MIN_COLUMN = 0;
export const MAX_COLUMN = 25;
export const MIN_ROW = 0;
export const MAX_ROW = 17;
