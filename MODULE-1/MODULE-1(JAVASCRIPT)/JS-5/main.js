// Event class definition
class Event {
  constructor(name, date, availableSeats, category) {
    this.name = name;
    this.date = date;
    this.availableSeats = availableSeats;
    this.category = category;
  }

  // Prototype method to check seat availability and upcoming date
  checkAvailability() {
    return this.availableSeats > 0 && new Date(this.date) >= new Date();
  }
}

// Updated events array with seats > 0 and future dates
let events = [
  new Event("Spring Festival", "2025-06-15", 5, "Festival"),
  new Event("Winter Gala", "2025-12-10", 10, "Gala"),       // updated seats & date
  new Event("Summer Picnic", "2025-07-01", 10, "Picnic"),   // updated date
  new Event("Autumn Marathon", "2025-09-05", 15, "Marathon")
];

// Registration tracker closure
function registrationTracker() {
  const counts = {};
  return {
    register(category) {
      if (!counts[category]) counts[category] = 0;
      counts[category]++;
      console.log(`Total registrations for ${category}: ${counts[category]}`);
    },
    getCount(category) {
      return counts[category] || 0;
    }
  };
}
const tracker = registrationTracker();

// Add event function
function addEvent(name, date, seats, category) {
  const newEvent = new Event(name, date, seats, category);
  events.push(newEvent);
  renderEvents();
}

// Register user function with try-catch error handling
function registerUser(eventIndex) {
  try {
    const event = events[eventIndex];
    if (!event) throw new Error("Event not found.");
    if (!event.checkAvailability()) throw new Error("No seats available or event passed.");

    event.availableSeats--;
    tracker.register(event.category);
    alert(`Registered successfully for ${event.name}!`);
    renderEvents();
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
  }
}

// Filter events by category and run callback
function filterEventsByCategory(category, callback) {
  if (category === 'all') {
    callback(events);
  } else {
    callback(events.filter(event => event.category === category));
  }
}

// List event keys and values using Object.entries()
function listEventDetails(event) {
  console.log(`Details for event: ${event.name}`);
  Object.entries(event).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

// Render events in the container
function renderEvents(filteredEvents = null) {
  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';

  const listToRender = filteredEvents || events;

  const validEvents = listToRender.filter(event => event.checkAvailability());

  if (validEvents.length === 0) {
    container.innerHTML = '<p class="no-events">No upcoming events with available seats at this time.</p>';
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
      <button class="detailsBtn" data-index="${originalIndex}">Details</button>
    `;
    container.appendChild(eventDiv);
  });

  // Add event listeners for register buttons
  document.querySelectorAll('.registerBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      registerUser(parseInt(idx, 10));
    });
  });

  // Add event listeners for details buttons
  document.querySelectorAll('.detailsBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      const event = events[idx];
      listEventDetails(event);
    });
  });
}

// Initial render
renderEvents();

// Filter dropdown event listener
const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  filterEventsByCategory(selectedCategory, (filtered) => {
    renderEvents(filtered);
  });
});

// Page load alert
window.addEventListener('load', () => {
  alert('Welcome to the Community Portal');
});
