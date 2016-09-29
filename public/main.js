var update = document.getElementById('update')

update.addEventListener('click', function () {
  fetch('people', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'firstName': 'Spanish',
      'lastName': 'Inquisition'
    })
  })
})
