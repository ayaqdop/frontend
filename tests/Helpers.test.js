import { range, calculateDescription } from "../static/components/Helpers";

test("range inclusive and positive only", () => {
  expect(range(3, 7)).toEqual([3, 4, 5, 6, 7]);
  expect(range(1, 2)).toEqual([1, 2]);
  expect(range(42, 42)).toEqual([42]);
});

test("calculateDescription empty corners", () => {
  expect(calculateDescription(0, 0)).toBe(" ");
  expect(calculateDescription(0, 25)).toBe("");
  expect(calculateDescription(25, 0)).toBe(" ");
  expect(calculateDescription(25, 25)).toBe("");
});

test("calculateDescription empty field", () => {
  for (let i of range(1, 24)) {
    for (let j of range(1, 16)) {
      expect(calculateDescription(i, j)).toBeFalsy();
    }
  }
});

test("calculateDescription alpha rows", () => {
  const rows = " abcdefghijklmnop ";

  for (let row of range(0, 17)) {
    let expectedLetter = rows.charAt(row);

    expect(calculateDescription(0, row)).toBe(expectedLetter);
    expect(calculateDescription(25, row)).toBe(expectedLetter);
  }
});

test("calculateDescription numeric columns", () => {
  for (let column of range(1, 24)) {
    expect(calculateDescription(column, 0)).toBe(column);
    expect(calculateDescription(column, 17)).toBe(column);
  }
});
