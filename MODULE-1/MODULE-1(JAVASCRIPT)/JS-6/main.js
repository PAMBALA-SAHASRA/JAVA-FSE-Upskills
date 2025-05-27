// Initial array of events
let communityEvents = [
  { name: "Jazz Night", date: "2025-06-20", category: "Music" },
  { name: "Art Workshop", date: "2025-06-25", category: "Workshop" },
  { name: "Summer Music Festival", date: "2025-07-10", category: "Music" },
  { name: "Community Picnic", date: "2025-07-05", category: "Picnic" }
];

// Add new event on button click using .push()
document.getElementById('addEventBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('eventName');
  const dateInput = document.getElementById('eventDate');
  const categoryInput = document.getElementById('eventCategory');

  const newEvent = {
    name: nameInput.value.trim(),
    date: dateInput.value,
    category: categoryInput.value
  };

  // Basic validation
  if (!newEvent.name || !newEvent.date) {
    alert('Please enter both event name and date.');
    return;
  }

  communityEvents.push(newEvent);
  nameInput.value = '';
  dateInput.value = '';
  categoryInput.value = 'Music';

  renderMusicEvents();
});

// Filter music events using .filter()
function getMusicEvents() {
  return communityEvents.filter(event => event.category === "Music");
}

// Format event display cards using .map()
function renderMusicEvents() {
  const musicEventsDiv = document.getElementById('musicEvents');
  const musicEvents = getMusicEvents();

  if (musicEvents.length === 0) {
    musicEventsDiv.innerHTML = '<p class="noMusicMsg">No music events available at the moment.</p>';
    return;
  }

  const cardsHTML = musicEvents.map(event => {
    return `<div class="eventCard">${event.name} — ${new Date(event.date).toLocaleDateString()}</div>`;
  }).join('');

  musicEventsDiv.innerHTML = cardsHTML;
}

// Initial render
renderMusicEvents();
