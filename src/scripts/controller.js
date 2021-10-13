import { characters } from './model';
import { updateHeaderCards, displayReticleAtCursor, displayPopupMenuAtCursor, updatePopupMenu } from './view';
import Timer from './timer';

const img = document.querySelector('.img__warp-core');
const popupMenu = document.querySelector('.popup__list');

let coordinates = {};

const timer = Timer();
let runningTimer;

const getClickCoordinates = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  return { top: y, left: x };
}


// Checks for ANY non-found character at location of user's click (coordinates) but does not modify found value
const checkForCharClick = (clickCoordinates) => {
  let charClicked = [];
  characters.forEach((character) => {
    if (character.isWithinBounds(clickCoordinates.top, clickCoordinates.left)) {
      if (!character.isFound()) {
        charClicked.push(character.name);
      }
    } 
  });
  return charClicked;
};

// Will return true if there are any characters that remain to be found. Use to control timer and other 'game-ending' features
const anyCharsRemaining = () => {
  return characters.some((char) => !char.isFound());
}


// Event propagation on popup ul element to catch user clicking on list item
popupMenu.addEventListener('click', (e) => {
  const charClicked = checkForCharClick(coordinates)
  if (e.target.classList.contains('popup__list-item')) {
    if (charClicked.length > 0) {
      if (e.target.dataset.name === charClicked[0]) {
        const charFound = characters.filter((char) => char.name === charClicked[0]);
        charFound[0].toggleFound();
        // TODO: Found success message, make in view module
        // Toggle UI on popup menu itself
        updatePopupMenu(e.target);
        if (!anyCharsRemaining()) {
          timer.end(runningTimer);
          console.log(timer.getFinalTime());
        }
      } else {
        // TODO: Miss error message, make in view module
      }
    } else {
      // TODO: Miss error message, make in view module
    }
    updateHeaderCards();
  }
});

window.addEventListener('click', (e) => {
  // All image-related functions should only be fired when the user actually clicks within the image boundaries.
  if (e.target === img) {    
    if (!timer.isRunning()) {
      runningTimer = timer.begin();
    }
    coordinates = getClickCoordinates(e);
    displayReticleAtCursor(coordinates);
    displayPopupMenuAtCursor(coordinates);   
  } else {
    // Remove reticle when clicking outside image, or clicking on the same spot twice
    document.querySelector('.popup__menu').style.display = 'none';
    document.querySelector('.popup__reticle').style.display = 'none';
  }
});