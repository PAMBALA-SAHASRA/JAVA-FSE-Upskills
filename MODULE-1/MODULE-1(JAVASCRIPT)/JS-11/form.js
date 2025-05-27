const form = document.getElementById('registrationForm')
const successMsg = document.getElementById('successMsg')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const { name, email, event: selectedEvent } = form.elements

  let hasError = false

  document.getElementById('nameError').textContent = ""
  document.getElementById('emailError').textContent = ""
  document.getElementById('eventError').textContent = ""
  successMsg.textContent = ""

  if (name.value.trim() === "") {
    document.getElementById('nameError').textContent = "Name is required"
    hasError = true
  }

  if (email.value.trim() === "") {
    document.getElementById('emailError').textContent = "Email is required"
    hasError = true
  } else if (!email.value.includes("@")) {
    document.getElementById('emailError').textContent = "Invalid email format"
    hasError = true
  }

  if (selectedEvent.value === "") {
    document.getElementById('eventError').textContent = "Please select an event"
    hasError = true
  }

  if (!hasError) {
    successMsg.textContent = `Thanks, ${name.value.trim()}! You've registered for "${selectedEvent.value}".`
    form.reset()
  }
})
