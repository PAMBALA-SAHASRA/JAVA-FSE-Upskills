const form = document.getElementById('ajaxForm')
const responseMsg = document.getElementById('responseMsg')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const name = form.elements.name.value.trim()
  const email = form.elements.email.value.trim()
  const eventSelected = form.elements.event.value

  responseMsg.textContent = "Submitting..."
  responseMsg.className = "message"

  const data = { name, email, event: eventSelected }

  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) throw new Error("Server error")
      return res.json()
    })
    .then(json => {
      responseMsg.textContent = "Registration successful!"
      responseMsg.classList.add("success")
      form.reset()
    })
    .catch(err => {
      responseMsg.textContent = "Registration failed. Try again later."
      responseMsg.classList.add("error")
    })
  }, 1500)
})
