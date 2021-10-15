import { characters, anyCharsRemaining } from './model';
import { updateHeaderCards, displayReticleAtCursor, displayPopupMenuAtCursor, updatePopupMenu } from './view';
import Timer from './timer';

const img = document.querySelector('.img__warp-core');
const popupMenu = document.querySelector('.popup__list');
const completeModal = document.querySelector('.complete-modal');

// Display a modal
function displayModal(modal) {
  modal.style.display = 'flex';
}

// Close a modal
function closeModal(modal) {
  modal.style.display = 'none';
}

// Close a modal on outside click (generally added to window as an event listener)
function outsideClick(e, modal) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

window.addEventListener('click', outsideClick);

let coordinates = {};

const timer = Timer();
let runningTimer;

// Returns the coordinates of the cursor on click relative to the bounding element (warp core img in this case)
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
          console.log(timer.getCurrentTime());
          // Toggle complete-modal 
          displayModal(completeModal);
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

// Global event listener
window.addEventListener('click', (e) => {
  // All image-related functions should only be fired when the user actually clicks within the image boundaries.
  if (e.target === img) {
    // Ensure the timer is started on first image click only
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