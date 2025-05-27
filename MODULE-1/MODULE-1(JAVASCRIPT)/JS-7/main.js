class Event {
  constructor(name, date, seats) {
    this.name = name;
    this.date = new Date(date);
    this.seats = seats;
    this.registered = 0;
  }

  hasSeats() {
    return this.seats - this.registered > 0;
  }

  isUpcoming() {
    const today = new Date();
    today.setHours(0,0,0,0);
    return this.date >= today;
  }
}

const events = [
  new Event("Spring Gala", "2025-06-20", 5),
  new Event("Music Picnic", "2025-07-15", 10),
  new Event("Autumn Festival", "2025-09-01", 0),
  new Event("Winter Workshop", "2024-12-05", 8)
];

const container = document.querySelector("#eventsContainer");

function renderEvents() {
  container.innerHTML = "";
  events.forEach((event, index) => {
    if (!event.isUpcoming() || !event.hasSeats()) return;

    const card = document.createElement("div");
    card.className = "eventCard";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const date = document.createElement("p");
    date.textContent = `Date: ${event.date.toDateString()}`;

    const seats = document.createElement("p");
    seats.textContent = `Seats available: ${event.seats - event.registered}`;

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Register";

    btn.addEventListener("click", () => {
      if (event.hasSeats()) {
        event.registered++;
        updateUI(index);
      } else {
        alert("No seats available!");
      }
    });

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(seats);
    card.appendChild(btn);
    container.appendChild(card);
  });

  if(container.children.length === 0){
    const noEventsMsg = document.createElement("p");
    noEventsMsg.textContent = "No upcoming events with available seats.";
    noEventsMsg.style.textAlign = "center";
    noEventsMsg.style.fontWeight = "600";
    container.appendChild(noEventsMsg);
  }
}

function updateUI(index) {
  const cards = container.children;
  const card = cards[index];

  if (!card) return;

  const seatsP = card.querySelector("p:nth-of-type(2)");
  const event = events[index];

  seatsP.textContent = `Seats available: ${event.seats - event.registered}`;

  if (!event.hasSeats()) {
    card.querySelector("button").disabled = true;
    card.querySelector("button").textContent = "Full";
  }
}

renderEvents();
