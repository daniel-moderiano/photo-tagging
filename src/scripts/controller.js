import { characters, anyCharsRemaining } from './model';
import { updateHeaderCards, displayReticleAtCursor, displayPopupMenuAtCursor, updatePopupMenu, removePopupStyling, toggleToast, displayModal, closeModal, switchToLeaderboard, switchToImage } from './view';
import Timer from './timer';
import { addUser } from './leaderboard';

// Initialise global controller variables
const img = document.querySelector('.img__warp-core');
const popupMenu = document.querySelector('.popup__list');
const completeModal = document.querySelector('.complete-modal');
const submitBtn = document.querySelector('.modal__submit');
const cancelBtn = document.querySelector('.modal__cancel');
const homeBtn = document.querySelector('.header__home');
const leaderboardBtn = document.querySelector('.header__leaderboard');

let coordinates = {};
let runningTimer;
const timer = Timer();

// Returns the coordinates of the cursor on click relative to the bounding element (warp core img in this case)
const getClickCoordinates = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  return { top: y, left: x };
}

// Checks for ANY non-found character at location of user's click (coordinates) but does not modify found value on character if successfully at click location
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

// Global event listener that listens specifically for image click before starting timer and setting other vars
window.addEventListener('click', (e) => {
  // All image-related functions should only be fired when the user actually clicks within the image boundaries.
  if (e.target === img) {
    // Ensure the timer is started on first image click only
    if (!timer.isRunning()) {
      // The following code snippet should be used whenever the timer needs to be started
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

// Event propagation on popup ul element to catch user clicking on list item
popupMenu.addEventListener('click', (e) => {
  const charClicked = checkForCharClick(coordinates);

  if (e.target.classList.contains('popup__list-item')) {
    // Checks that the user's click is on the location of a character
    if (charClicked.length > 0) {
      // Checks that the user selects the matching popup menu item to the char clicked
      if (e.target.dataset.name === charClicked[0]) {
        // Toggle found status in codebase
        const [charFound] = characters.filter((char) => char.name === charClicked[0]);
        charFound.toggleFound();

        // Update UI to reflect char found
        toggleToast('Found one!', 'success');
        updatePopupMenu(e.target);

        // End game if all characters have been found
        if (!anyCharsRemaining()) {
          timer.end(runningTimer);
          displayModal(completeModal);
          document.querySelector('.modal__text-time').textContent = ` ${timer.getCurrentTime()} `;
          document.querySelector('.modal__text-time').dataset.time = timer.getCurrentTime();
        }
      } else {
        toggleToast('Hmm, not there...', 'error');
      }
    } else {
      toggleToast('Hmm, not there...', 'error');
    }
    // Reflect any found characters by updating the header pictures
    updateHeaderCards();
  }
});

// Switching to leaderboard 'page' should reset the timer
leaderboardBtn.addEventListener('click', () => {
  if (timer.isRunning()) {
    timer.end(runningTimer);
    timer.reset();
  }
  switchToLeaderboard();
});

// Switching to home/image page should reset the timer and UI so the user can play again
homeBtn.addEventListener('click', () => {
  timer.end(runningTimer);
  timer.reset();
  // Alter found status on all characters, then update header cards and popup menu
  characters.forEach((char) => {
    if (char.isFound()) {
      char.toggleFound();
    }
  });
  updateHeaderCards();
  removePopupStyling();
  switchToImage();
});

// User clicks this button to submit their high score to the Firestore db
submitBtn.addEventListener('click', () => {
  // Get user data. Dataset is used to avoid having to trim spaces from the modal title time
  const name = document.querySelector('#input-name').value;
  const time = parseFloat(document.querySelector('.modal__text-time').dataset.time);

  // Reject empty name field as firebase will accept this on the backend otherwise
  if (name === "") {
    toggleToast('Name cannot be left blank', 'error');
    throw new Error('Must enter name');
  }

  // Give the user visual indication that the request is in progress
  submitBtn.textContent = 'Submitting...';

  // Call async function to add user to leaderboard, then close modal and switch page
  addUser(name, time).then(() => {
    submitBtn.textContent = 'Submit';
    closeModal(completeModal);
    switchToLeaderboard();
  }) // .catch can be added here if necessary
});

// Avoid submitting high score, and instead return to the home/image page
cancelBtn.addEventListener('click', () => {
  closeModal(completeModal);
  // Reset timer to zero but DO NOT start timer again here
  timer.reset();
  // Alter found status on all characters, then update header cards and popup menu
  characters.forEach((char) => {
    char.toggleFound();
  });
  updateHeaderCards();
  removePopupStyling();
  switchToImage();
});
