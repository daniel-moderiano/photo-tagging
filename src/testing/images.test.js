import { character } from "../scripts/image";

// Testing the image module
test('character function correctly initialises maxTop', () => {
  const waldo = character(1135, 1026, 78, 120);
  expect(waldo.maxTop).toBe(1255);
});

test('character function correctly initialises maxLeft', () => {
  const waldo = character(1135, 1026, 78, 120);
  expect(waldo.maxLeft).toBe(1104);
});