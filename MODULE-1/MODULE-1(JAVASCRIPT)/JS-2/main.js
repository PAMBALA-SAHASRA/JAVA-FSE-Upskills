
const eventName = "Spring Festival";
const eventDate = "2025-06-15";


let availableSeats = 50;


const eventInfoDiv = document.getElementById('eventInfo');

function updateEventInfo() {
  eventInfoDiv.textContent = `Event: ${eventName} | Date: ${eventDate} | Available Seats: ${availableSeats}`;
}


updateEventInfo();


const registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', () => {
  if (availableSeats > 0) {
    availableSeats--; 
    updateEventInfo();
    alert(`You have successfully registered for ${eventName}!`);
  } else {
    alert("Sorry, no seats available.");
  }
});
