const form = document.getElementById('ajaxForm')
const responseMsg = document.getElementById('responseMsg')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  console.log("Form submitted")

  const name = form.elements.name.value.trim()
  const email = form.elements.email.value.trim()
  const eventSelected = form.elements.event.value

  console.log("Collected Data:", { name, email, eventSelected })

  responseMsg.textContent = "Submitting..."
  responseMsg.className = "message"

  const data = { name, email, event: eventSelected }

  // Debug: Check data before sending
  console.log("Payload to send:", JSON.stringify(data))

  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      console.log("Fetch response status:", res.status)
      if (!res.ok) throw new Error("Server error")
      return res.json()
    })
    .then(json => {
      console.log("Response JSON:", json)
      responseMsg.textContent = "Registration successful!"
      responseMsg.classList.add("success")
      form.reset()
    })
    .catch(err => {
      console.error("Error occurred:", err)
      responseMsg.textContent = "Registration failed. Try again later."
      responseMsg.classList.add("error")
    })
  }, 1500)
})
