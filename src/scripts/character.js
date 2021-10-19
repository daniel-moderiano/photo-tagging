// Use a factory function to generate character objects with data about their location, whether they have yet been found, and methods to determine when/if they are clicked/found
function Character(name, top, left, width, height) {

  // Found status can be toggled and returned below, to then activate other actions dependent on it
  let found = false;

  const isFound = () => {
    return found;
  };

  const toggleFound = () => {
    if (found) {
      found = false;
    } else {
      found = true;
    }
  }

  // Min and max defined by the set width and height of each character (based on fixed images size)
  const minTop = top;
  const minLeft = left;
  const maxTop = minTop + height;
  const maxLeft = minLeft + width;

  // Check, given a top and left mouse coordinate within warp core img, whether those coordinates are within the bounds of this character
  const isWithinBounds = (clickTop, clickLeft) => {
    if (clickTop <= minTop || clickTop >= maxTop) {
      return false;
    }

    if (clickLeft <= left || clickLeft >= maxLeft) {
      return false;
    }

    return true;
  }

  return {
    name,
    minTop,
    maxTop,
    minLeft,
    maxLeft,
    isWithinBounds,
    isFound,
    toggleFound,
  }
};

export default Character;