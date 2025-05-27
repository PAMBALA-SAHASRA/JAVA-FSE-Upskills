// Initial events array with categories
let events = [
  { name: "Spring Festival", date: "2025-06-15", availableSeats: 5, category: "Festival" },
  { name: "Winter Gala", date: "2024-12-10", availableSeats: 0, category: "Gala" },
  { name: "Summer Picnic", date: "2023-07-01", availableSeats: 10, category: "Picnic" }, // past event
  { name: "Autumn Marathon", date: "2025-09-05", availableSeats: 15, category: "Marathon" }
];

// Closure for tracking total registrations by category
function registrationTracker() {
  const counts = {};
  return {
    register(category) {
      if (!counts[category]) {
        counts[category] = 0;
      }
      counts[category]++;
      console.log(`Total registrations for ${category}: ${counts[category]}`);
    },
    getCount(category) {
      return counts[category] || 0;
    }
  };
}
const tracker = registrationTracker();

// Helper to check if event is upcoming
function isUpcoming(dateStr) {
  return new Date(dateStr) >= new Date();
}

/**
 * Adds a new event to the events list.
 * @param {string} name - Event name
 * @param {string} date - Event date in yyyy-mm-dd format
 * @param {number} seats - Available seats
 * @param {string} category - Event category
 */
function addEvent(name, date, seats, category) {
  events.push({ name, date, availableSeats: seats, category });
  renderEvents();
}

/**
 * Registers a user for an event by index.
 * Decrements available seats and tracks registration.
 * @param {number} eventIndex - Index of the event in the events array
 */
function registerUser(eventIndex) {
  try {
    const event = events[eventIndex];
    if (!event) throw new Error("Event not found.");
    if (!isUpcoming(event.date)) throw new Error("Cannot register for past event.");
    if (event.availableSeats <= 0) throw new Error("No seats available.");

    event.availableSeats--;
    tracker.register(event.category);
    alert(`Registered successfully for ${event.name}!`);
    renderEvents();
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
  }
}

/**
 * Filters events by category and passes filtered list to a callback.
 * @param {string} category - Category to filter by (or 'all')
 * @param {function} callback - Function to handle filtered events
 */
function filterEventsByCategory(category, callback) {
  if (category === 'all') {
    callback(events);
  } else {
    callback(events.filter(event => event.category === category));
  }
}

// Renders events on the page (optional filteredEvents array)
function renderEvents(filteredEvents = null) {
  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';

  const listToRender = filteredEvents || events;

  // Show only upcoming events with seats
  const validEvents = listToRender.filter(event => isUpcoming(event.date) && event.availableSeats > 0);

  if (validEvents.length === 0) {
    container.innerHTML = '<p>No upcoming events with available seats at this time.</p>';
    return;
  }

  validEvents.forEach(event => {
    const originalIndex = events.indexOf(event);

    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Available Seats:</strong> ${event.availableSeats}</p>
      <button class="registerBtn" data-index="${originalIndex}">Register</button>
    `;
    container.appendChild(eventDiv);
  });

  // Attach registration event listeners
  document.querySelectorAll('.registerBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      registerUser(parseInt(idx, 10));
    });
  });
}

// Initial render
renderEvents();

// Setup category filter with callback
const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  filterEventsByCategory(selectedCategory, (filtered) => {
    renderEvents(filtered);
  });
});
