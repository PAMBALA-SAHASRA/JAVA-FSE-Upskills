const events = [
  { name: "Jazz Concert", date: "2025-06-20", category: "Music", seats: 5, registered: 0 },
  { name: "Bread Baking Workshop", date: "2025-06-25", category: "Workshop", seats: 3, registered: 1 },
  { name: "Family Picnic", date: "2025-07-10", category: "Picnic", seats: 4, registered: 0 },
  { name: "Summer Fest", date: "2025-07-30", category: "Festival", seats: 0, registered: 5 },
  { name: "Rock Night", date: "2025-08-15", category: "Music", seats: 6, registered: 2 }
]

const eventList = document.querySelector("#eventList")
const categoryFilter = document.querySelector("#categoryFilter")
const searchInput = document.querySelector("#searchInput")

function displayEvents(filterCategory = "All", searchTerm = "") {
  eventList.innerHTML = ""
  const filtered = events.filter(e => {
    const matchCategory = filterCategory === "All" || e.category === filterCategory
    const matchName = e.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchName
  })

  filtered.forEach((event, index) => {
    const card = document.createElement("div")
    card.className = "eventCard"

    const title = document.createElement("h3")
    title.textContent = event.name

    const date = document.createElement("p")
    date.textContent = "Date: " + new Date(event.date).toDateString()

    const category = document.createElement("p")
    category.textContent = "Category: " + event.category

    const seats = document.createElement("p")
    const available = event.seats - event.registered
    seats.textContent = "Available Seats: " + available

    const btn = document.createElement("button")
    btn.className = "btn"
    btn.textContent = "Register"
    btn.disabled = available <= 0

    btn.onclick = () => {
      if (event.registered < event.seats) {
        event.registered++
        displayEvents(categoryFilter.value, searchInput.value)
      }
    }

    card.appendChild(title)
    card.appendChild(date)
    card.appendChild(category)
    card.appendChild(seats)
    card.appendChild(btn)
    eventList.appendChild(card)
  })
}

categoryFilter.onchange = () => {
  displayEvents(categoryFilter.value, searchInput.value)
}

searchInput.addEventListener("keydown", () => {
  setTimeout(() => {
    displayEvents(categoryFilter.value, searchInput.value)
  }, 100)
})

displayEvents()
