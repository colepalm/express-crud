var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  fetch('people', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'firstName': 'Spanish',
      'lastName': 'Inquisition',
      'dateOfBirth': '05/12/1492',
      'zipCode': '00000'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload()
  })
})

del.addEventListener('click', function () {
  fetch('people', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'firstName': 'Spanish'
    })
  })
  .then(data => {
    window.location.reload()
  })
})
