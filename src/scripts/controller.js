import { characters } from './model';
import { updateHeaderCards } from './view';

const img = document.querySelector('.img__warp-core');
const reticle = document.querySelector('.popup__reticle');
const popupMenu = document.querySelector('.popup__menu');

const getClickCoordinates = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  return { top: y, left: x };
}

// Calculate the position of the mouse click relative the the top and left of the image 
img.addEventListener('click', (e) => {
  // Get size of image/div 
  const coordinates = getClickCoordinates(e);
  // console.log("Left? : " + coordinates.left + " ; Top? : " + coordinates.top + ".");
})

const checkForCharClick = (clickCoordinates) => {
  characters.forEach((character) => {
    if (character.isWithinBounds(clickCoordinates.top, clickCoordinates.left)) {
      console.log(`${character.name} clicked`);
      if (!character.isFound()) {
        character.toggleFound();
        return true;
      }
    } 
  });
  console.log('Missed');
}

// The above function may be adapted to give a target 'area' on the click, rather than a pinpoint for UI purposes. However, a pinpoint click can be used for verification if it exists within a 'box' containing the character 

// Places the reticle centered over the mouse when the image is clicked
window.addEventListener('click', (e) => {
  if (e.target === img) {
    reticle.style.display = 'grid';
    popupMenu.style.display = 'block';
    const coordinates = getClickCoordinates(e);
    // 25px is chosen because of the width of the reticle at 50px
    reticle.style.top = `${coordinates.top - 25}px`;
    reticle.style.left = `${coordinates.left - 25}px`;
    popupMenu.style.top = `${coordinates.top + 25}px`;
    popupMenu.style.left = `${coordinates.left - 25}px`;
    checkForCharClick(coordinates);
    characters.forEach((character) => {
      console.log(`${character.name} found yet: ` + character.isFound());
    })
    if (checkForCharClick(coordinates) === true) {
      // Set error/success DOM element to display
    }
  } else {
    // Remove reticle when clicking outside image, or clicking on the same spot twice
    popupMenu.style.display = 'none';
    reticle.style.display = 'none';
  }
});

// Rect sizes for warp core sized at 1200px, relative to edge of warp core img