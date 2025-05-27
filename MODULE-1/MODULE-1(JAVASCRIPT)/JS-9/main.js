const spinner = document.querySelector("#spinner")
const eventList = document.querySelector("#eventList")

spinner.style.display = "block"

fetch("events.json")
  .then(response => response.json())
  .then(events => {
    spinner.style.display = "none"
    displayEvents(events)
  })
  .catch(error => {
    spinner.textContent = "Failed to load events"
    console.error(error)
  })

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
