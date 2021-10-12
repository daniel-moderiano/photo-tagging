import character from '../scripts/character';

// Testing the character module
test('character function correctly initialises maxTop', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.maxTop).toBe(1255);
});

test('character function correctly initialises maxLeft', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.maxLeft).toBe(1104);
});

test('return true for coordinates within character bounds', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.isWithinBounds(1164, 1060.666)).toBe(true);
});

test('return false for coordinates on character bounds', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.isWithinBounds(1135, 1026)).toBe(false);
});

test('return false for coordinates outside character bounds', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.isWithinBounds(1383, 504.7)).toBe(false);
});

test('return false for coordinates with one axis in and one out of character bounds', () => {
  const waldoChar = character('Waldo', 1135, 1026, 78, 120);
  expect(waldoChar.isWithinBounds(1111, 1068)).toBe(false);
});