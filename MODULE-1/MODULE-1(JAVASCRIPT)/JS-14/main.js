$(document).ready(function () {
  $('#showEvents').click(function () {
    $('#event1, #event2').fadeIn(1000)
  })

  $('#registerBtn1').click(function () {
    alert('Registered for Music Night!')
    $('#event1').fadeOut(800)
  })

  $('#registerBtn2').click(function () {
    alert('Registered for Yoga Retreat!')
    $('#event2').fadeOut(800)
  })
})
