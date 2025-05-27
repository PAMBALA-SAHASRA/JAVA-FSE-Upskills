
const events = [
  { name: "Spring Festival", date: "2025-06-15", availableSeats: 5 },
  { name: "Winter Gala", date: "2024-12-10", availableSeats: 0 },
  { name: "Summer Picnic", date: "2023-07-01", availableSeats: 10 }, 
  { name: "Autumn Marathon", date: "2025-09-05", availableSeats: 15 }
];


const eventsContainer = document.getElementById('eventsContainer');


function isUpcoming(dateStr) {
  const today = new Date();
  const eventDate = new Date(dateStr);
  return eventDate >= today;
}


function renderEvents() {
  eventsContainer.innerHTML = ''; 

  
  const validEvents = events.filter(event => {
    if (isUpcoming(event.date) && event.availableSeats > 0) {
      return true;
    } else {
      return false;
    }
  });

 
  if (validEvents.length === 0) {
    eventsContainer.innerHTML = '<p>No upcoming events with available seats at this time.</p>';
    return;
  }

  
  validEvents.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    eventDiv.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Available Seats:</strong> <span id="seats-${index}">${event.availableSeats}</span></p>
      <button class="registerBtn" data-index="${index}">Register</button>
    `;

    eventsContainer.appendChild(eventDiv);
  });

  
  const buttons = document.querySelectorAll('.registerBtn');
  buttons.forEach(button => {
    button.addEventListener('click', handleRegistration);
  });
}


function handleRegistration(event) {
  const btn = event.target;
  const idx = btn.getAttribute('data-index');
  const selectedEvent = events[idx];

  try {
    if (!selectedEvent) throw new Error("Event not found.");

    if (!isUpcoming(selectedEvent.date)) {
      throw new Error("Cannot register for past events.");
    }

    if (selectedEvent.availableSeats <= 0) {
      throw new Error("No seats available.");
    }

   
    selectedEvent.availableSeats--;

    
    const seatsSpan = document.getElementById(`seats-${idx}`);
    seatsSpan.textContent = selectedEvent.availableSeats;

    alert(`You have successfully registered for ${selectedEvent.name}!`);

    
    if (selectedEvent.availableSeats === 0) {
      renderEvents();
    }
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
  }
}


renderEvents();
