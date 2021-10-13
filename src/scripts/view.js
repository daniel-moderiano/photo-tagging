import { characters } from "./model";

// Reducing opacity of image in header character cards visually indicates that they have been found.
const updateHeaderCards = () => {
  characters.forEach((char) => {
    if (char.isFound()) {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '10%';
    }
    console.log(char.name, char.isFound());
  });
};

// TODO: function to alter the popopMenu perhaps with a strikethrough for characters that have been found?

// Sets reticle element to the user's position. 
const displayReticleAtCursor = (coordinates) => {
  const reticle = document.querySelector('.popup__reticle');
  reticle.style.display = 'grid';
  // 25px is used because the reticle element has height/width of 50px. If this size is changed, this function should be changed to 1/2 of the new dimensions. As should popupMenu func.
  reticle.style.top = `${coordinates.top - 25}px`;
  reticle.style.left = `${coordinates.left - 25}px`;
};

// Sets popup menu to the user's cursor position, but with reticle placement in mind
const displayPopupMenuAtCursor = (coordinates) => {
  const popupMenu = document.querySelector('.popup__menu');
  popupMenu.style.display = 'block';
  popupMenu.style.top = `${coordinates.top + 25}px`;
  popupMenu.style.left = `${coordinates.left - 25}px`;
};

export { 
  updateHeaderCards, 
  displayPopupMenuAtCursor, 
  displayReticleAtCursor,
};