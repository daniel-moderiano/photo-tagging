const img = document.querySelector('.img__warp-core');
const reticle = document.querySelector('.popup__reticle');
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
    reticle.style.display = 'grid';
    popupMenu.style.display = 'block';
    const coordinates = getClickCoordinates(e);
    // 25px is chosen because of the width of the reticle at 50px
    reticle.style.top = `${coordinates.y - 25}px`;
    reticle.style.left = `${coordinates.x - 25}px`;
    popupMenu.style.top = `${coordinates.y + 25}px`;
    popupMenu.style.left = `${coordinates.x - 25}px`;
  } else {
    // Remove reticle when clicking outside image, or clicking on the same spot twice
    popupMenu.style.display = 'none';
    reticle.style.display = 'none';
  }
});

// Rect sizes for warrp core sized at 1200px, relative to edge of warp core img

// Robocop
const robocop = {
  top: 580,
  left: 422,
  width: 40,
  height: 40,
};

const walle = {
  top: 435,
  left: 1030,
  width: 100,
  height: 100,
};

const groot = {
  top: 1300,
  left: 300,
  width: 58,
  height: 68,
};

const yoda = {
  top: 1370,
  left: 720,
  width: 74,
  height: 110,
};

const waldo = {
  top: 1135,
  left: 1026,
  width: 78,
  height: 120,
};