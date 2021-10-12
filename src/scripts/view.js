import { characters } from "./model";

const updateHeaderCards = () => {
  characters.forEach((char) => {
    if (char.isFound()) {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '10%';
    }
  });
};

export { updateHeaderCards };