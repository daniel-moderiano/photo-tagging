const img = document.querySelector('.img__warp-core');
const reticle = document.querySelector('.target');

// Calculate the position of the mouse click relative the the top and left of the image 
img.addEventListener('click', (e) => {
  // Get size of image/div 
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top;  //y position within the element.
  console.log("Left? : " + x + " ; Top? : " + y + ".");
})

// The above function may be adapted to give a target 'area' on the click, rather than a pinpoint for UI purposes. However, a pinpoint click can be used for verification if it exists within a 'box' containing the character 

// Places the reticle centered over the mouse when the image is clicked
window.addEventListener('click', (e) => {
  if (e.target === img) {
    reticle.style.display = 'grid';
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.
    // 25px is chosen because of the witch of the reticle at 50px
    reticle.style.top = `${y - 25}px`;
    reticle.style.left = `${x - 25}px`;
  } else {
    reticle.style.display = 'none';
  }
})