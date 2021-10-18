import { characters } from "./model";

// Reducing opacity of image in header character cards visually indicates that they have been found.
const updateHeaderCards = () => {
  characters.forEach((char) => {
    if (char.isFound()) {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '10%';
    } else {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '100%';
    }
  });
};

const updatePopupMenu = (element) => {
  element.style.textDecoration = 'line-through';
  element.style.color = '#646464';
}

const removePopupStyling = () => {
  document.querySelectorAll('.popup__list-item').forEach((item) => {
    item.style.textDecoration = 'none';
    item.style.color = '#f4f4f4';
  })
}

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

// Takes array of user documents, and converts them into a UI list-style element for leaderboard
const renderLeaderboard = (users) => {
  const leaderList = document.querySelector('.leaderboard__list');
  if (users.length !== 0) {
    let html = '';
    
    // Render leaderboard
    users.forEach((user) => {
      const data = user.data();
      const timeFormatted = new Date(data.time * 1000).toISOString().substr(15, 4);
      const li = `
        <li class="leaderboard__user">
          <div class="leaderboard__name">${data.name}</div>
          <div class="leaderboard__time">${timeFormatted}</div>
        </li>
      `;
      html += li;
    });
    leaderList.innerHTML = html;
  } else {
    // Render a standard message when no recorded users exist
    leaderList.innerHTML = '<h3 class="leaderboard__msg">Find all the characters to record a score!<h3/>';
  }
}

export { 
  updateHeaderCards, 
  displayPopupMenuAtCursor, 
  displayReticleAtCursor,
  updatePopupMenu,
  removePopupStyling,
  renderLeaderboard,
};