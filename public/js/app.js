console.log('Client side javascript file is loaded!')

var locationForm = document.querySelector('form')
var search = document.querySelector('input')
var p1 = document.querySelector('#m1')
var p2 = document.querySelector('#m2')
locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    p1.textContent = 'Loading..'
    p2.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                p1.textContent = data.error

            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
    // console.log(location)
})