import Character from "./character";

// Define the preset characters for the warp core img

const waldo = Character('Waldo', 1135, 1026, 78, 120);
const yoda = Character('Yoda', 1370, 720, 74, 110);
const walle = Character('Wall·E', 438, 1033, 95, 95);
const groot = Character('Baby Groot', 1300, 300, 58, 68);
const robocop = Character('Robocop', 580, 422, 40, 40);

const characters = [
  waldo,
  yoda,
  walle,
  groot,
  robocop,
];

// Will return true if there are any characters that remain to be found. Use to control timer and other 'game-ending' features
const anyCharsRemaining = () => {
  return characters.some((char) => !char.isFound());
}


export { characters, anyCharsRemaining };