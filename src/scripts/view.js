import { characters } from "./model";

// Reducing opacity of image in header character cards visually indicates that they have been found.
const updateHeaderCards = () => {
  characters.forEach((char) => {
    if (char.isFound()) {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '0.1';
    } else {
      document.querySelector(`[data-name='${char.name}']`).style.opacity = '1';
    }
  });
};

// Cross off each name for characters found to aid user through the puzzle
const updatePopupMenu = (element) => {
  element.style.textDecoration = 'line-through';
  element.style.color = '#646464';
}

// Resets the popup menu styling to normal; used on puzzle restart
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
  const leaderTable = document.querySelector('.leaderboard__table');
  const leaderboardSubtitle = document.querySelector('.leaderboard__subtitle');

  // users.length will  be >0 when there is at least one recorded high score
  if (users.length !== 0) {
    // Render the users table
    leaderTable.innerHTML = '<tr><th class="header-rank">Rank</th><th class="header-name">Name</th><th class="header-time">Time (seconds)</th></tr>';

    // Remove subtitle when scores exist
    leaderboardSubtitle.style.display = 'none';
    
    // Render leaderboard
    users.forEach((user, index) => {
      const data = user.data();
      const tr = document.createElement('tr');

      // Create basic table row with the user data. Because the data is pre-sorted, the index can be used for the rank column
      const tdRank = document.createElement('td');
      tdRank.classList.add('table__rank');
      tdRank.textContent = index + 1;

      const tdName = document.createElement('td');
      tdRank.classList.add('table__name');
      tdName.textContent = data.name;

      const tdTime = document.createElement('td');
      tdRank.classList.add('table__time');
      tdTime.textContent = data.time;

      tr.appendChild(tdRank);
      tr.appendChild(tdName);
      tr.appendChild(tdTime);
      leaderTable.appendChild(tr);
    });
  } else {
    // Render a standard message when no recorded users exist, and remove the blank table
    leaderTable.innerHTML = '';
    document.querySelector('.leaderboard__subtitle').style.display = 'block';
  }
}

// Function to control toast notifications. Available types are error and success
const toggleToast = (message, typeOfToast) => {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.className = 'toast toast--visible'
  toast.classList.add(`toast--${typeOfToast}`);

  // Toast will fade out after 1 second
  setTimeout(() => {
    toast.classList.remove('toast--visible')
  }, 1000);
};

// Display a modal
const displayModal = (modal) => {
  modal.style.display = 'flex';
  // Reset any input field from a previous attempt
  modal.querySelector('input').value = "";
}

// Close a modal
const closeModal = (modal) => {
  modal.style.display = 'none';
}

// Call this to 'navigate' to the leaderboard page
const switchToLeaderboard = () => {
  document.querySelector('.img').style.display = 'none';
  document.querySelector('.leaderboard').style.display = 'flex';
};

// Call this to 'navigate' to the image/home page
const switchToImage = () => {
  document.querySelector('.leaderboard').style.display = 'none';
  document.querySelector('.img').style.display = 'flex';
};

export { 
  updateHeaderCards, 
  displayPopupMenuAtCursor, 
  displayReticleAtCursor,
  updatePopupMenu,
  removePopupStyling,
  renderLeaderboard,
  toggleToast,
  displayModal,
  closeModal,
  switchToImage,
  switchToLeaderboard,
};