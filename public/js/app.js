console.log('Loaded client side JS file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne = document.querySelector("#location")
var messagetwo = document.querySelector("#weather")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messagetwo.textContent = data.weather
            }

        })
    })
})