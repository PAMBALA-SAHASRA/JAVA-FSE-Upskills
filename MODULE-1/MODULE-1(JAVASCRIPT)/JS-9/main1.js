const spinner = document.querySelector("#spinner")
const eventList = document.querySelector("#eventList")

async function fetchAndDisplayEvents() {
  spinner.style.display = "block"
  try {
    const response = await fetch("events.json")
    const events = await response.json()
    spinner.style.display = "none"
    displayEvents(events)
  } catch (err) {
    spinner.textContent = "Error loading events"
    console.error(err)
  }
}

function displayEvents(events) {
  eventList.innerHTML = ""
  events.forEach(event => {
    const card = document.createElement("div")
    card.className = "eventCard"

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${new Date(event.date).toDateString()}</p>
      <p>Category: ${event.category}</p>
      <p>Available Seats: ${event.seats - event.registered}</p>
      <button ${event.seats - event.registered <= 0 ? "disabled" : ""}>
        Register
      </button>
    `

    eventList.appendChild(card)
  })
}

fetchAndDisplayEvents()
