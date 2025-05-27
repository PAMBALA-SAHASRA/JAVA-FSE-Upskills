const eventList = document.querySelector("#eventList")

const events = [
  { name: "Jazz Night", date: "2025-06-20", category: "Music", seats: 5, registered: 0 },
  { name: "Tech Bootcamp", date: "2025-06-25", category: "Workshop", seats: 10, registered: 2 },
  { name: "Family Picnic", date: "2025-07-05", category: "Picnic", seats: 0, registered: 5 },
  { name: "Art Festival", date: "2025-08-15", category: "Festival", seats: 8, registered: 4 }
]

const displayEvents = (eventArray = []) => {
  eventList.innerHTML = ""
  const eventCopy = [...eventArray]

  eventCopy.forEach(event => {
    const { name, date, category, seats, registered } = event
    const available = seats - registered

    const card = document.createElement("div")
    card.className = "eventCard"
    card.innerHTML = `
      <h3>${name}</h3>
      <p>Date: ${new Date(date).toDateString()}</p>
      <p>Category: ${category}</p>
      <p>Available Seats: ${available}</p>
      <button class="btn" ${available <= 0 ? "disabled" : ""}>Register</button>
    `

    const button = card.querySelector("button")
    button.addEventListener("click", () => registerUser(event))

    eventList.appendChild(card)
  })
}

const registerUser = ({ name, seats, registered }) => {
  const event = events.find(e => e.name === name)
  if (event && event.registered < event.seats) {
    event.registered++
    displayEvents(events)
  }
}

displayEvents(events)
