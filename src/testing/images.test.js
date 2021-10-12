import character from '../scripts/character'

// Testing the image module
test('character function correctly initialises maxTop', () => {
  const waldoChar = character(1135, 1026, 78, 120);
  expect(waldoChar.maxTop).toBe(1255);
});

test('character function correctly initialises maxLeft', () => {
  const waldoChar = character(1135, 1026, 78, 120);
  expect(waldoChar.maxLeft).toBe(1104);
});