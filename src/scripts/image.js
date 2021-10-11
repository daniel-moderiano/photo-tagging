const img = document.querySelector('.img__warp-core');
const reticle = document.querySelector('.popup__reticle');
const popup = document.querySelector('.popup');
const popupMenu = document.querySelector('.popup__menu');

const getClickCoordinates = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  return { x: x, y: y };
}

// Calculate the position of the mouse click relative the the top and left of the image 
img.addEventListener('click', (e) => {
  // Get size of image/div 
  const coordinates = getClickCoordinates(e);
  console.log("Left? : " + coordinates.x + " ; Top? : " + coordinates.y + ".");
})

// The above function may be adapted to give a target 'area' on the click, rather than a pinpoint for UI purposes. However, a pinpoint click can be used for verification if it exists within a 'box' containing the character 

// Places the reticle centered over the mouse when the image is clicked
window.addEventListener('click', (e) => {
  if (e.target === img) {
    // popup.style.display = 'block';
    reticle.style.display = 'grid';
    popupMenu.style.display = 'block';
    const coordinates = getClickCoordinates(e);
    // 25px is chosen because of the width of the reticle at 50px
    // popup.style.top = `${coordinates.y - 25}px`;
    // popup.style.left = `${coordinates.x - 25}px`;
    reticle.style.top = `${coordinates.y - 25}px`;
    reticle.style.left = `${coordinates.x - 25}px`;
    popupMenu.style.top = `${coordinates.y + 25}px`;
    popupMenu.style.left = `${coordinates.x - 25}px`;
  } else {
    // Remove reticle when clicking outside image, or clicking on the same spot twice
    // popup.style.display = 'none';
    popupMenu.style.display = 'none';
    reticle.style.display = 'none';
  }
})