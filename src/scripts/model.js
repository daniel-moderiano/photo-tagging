import character from "./character";

// Define the preset characters for the warp core img

const waldo = character('Waldo', 1135, 1026, 78, 120);
const yoda = character('Yoda', 1370, 720, 74, 110);
const walle = character('Wall·E', 438, 1033, 95, 95);
const groot = character('Baby Groot', 1300, 300, 58, 68);
const robocop = character('Robocop', 580, 422, 40, 40);

const characters = [
  waldo,
  yoda,
  walle,
  groot,
  robocop,
];

export { characters };