import { characters, anyCharsRemaining } from './model';
import { updateHeaderCards, displayReticleAtCursor, displayPopupMenuAtCursor, updatePopupMenu, removePopupStyling, toggleToast } from './view';
import Timer from './timer';
import { addUser } from './leaderboard';

const img = document.querySelector('.img__warp-core');
const popupMenu = document.querySelector('.popup__list');
const completeModal = document.querySelector('.complete-modal');
const submitBtn = document.querySelector('.modal__submit');
const cancelBtn = document.querySelector('.modal__cancel');
const homeBtn = document.querySelector('.header__home');
const leaderboardBtn = document.querySelector('.header__leaderboard');

// Display a modal
function displayModal(modal) {
  modal.style.display = 'flex';
  // Reset any input field from a previous attempt
  modal.querySelector('input').value = "";
}

// Close a modal
function closeModal(modal) {
  modal.style.display = 'none';
}

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
        
        toggleToast('Found one!', 'success');
        // Toggle UI on popup menu itself
        updatePopupMenu(e.target);
        if (!anyCharsRemaining()) {
          timer.end(runningTimer);
          // Toggle complete-modal 
          displayModal(completeModal);
          document.querySelector('.modal__text-time').textContent = ` ${parseFloat(timer.getCurrentTime()).toFixed(1)} `;
          document.querySelector('.modal__text-time').dataset.time = timer.getCurrentTime();
        }
      } else {
        toggleToast('Hmm, not there...', 'error');
      }
    } else {
      toggleToast('Hmm, not there...', 'error');
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
  document.querySelector('.leaderboard').style.display = 'none';
  document.querySelector('.img').style.display = 'flex';
});


leaderboardBtn.addEventListener('click', () => {
  closeModal(completeModal);
  if (timer.isRunning()) {
    timer.end(runningTimer);
    timer.reset();
  }

  document.querySelector('.img').style.display = 'none';
  document.querySelector('.leaderboard').style.display = 'flex';
});

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
  
  document.querySelector('.img').style.display = 'flex';
  document.querySelector('.leaderboard').style.display = 'none';
});

submitBtn.addEventListener('click', () => {
  // Get user data
  const name = document.querySelector('#input-name').value;
  const time = parseFloat(document.querySelector('.modal__text-time').dataset.time);

  if (name === "") {
    toggleToast('Name cannot be left blank', 'error');
    throw new Error('Must enter name');
  }

  submitBtn.textContent = 'Submitting...'
  // Call async function to add user to leaderboard, then close modal
  addUser(name, time).then(() => {
    closeModal(completeModal);
    submitBtn.textContent = 'Submit';
    document.querySelector('.img').style.display = 'none';
    document.querySelector('.leaderboard').style.display = 'flex';
  }).catch((err) => {
    console.log(err.message);
  })
});

