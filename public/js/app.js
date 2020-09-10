//this is client side JavaScript

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//main function
const getWeather = (location, units) => {
    fetch('/weather?address=' + location + '&units=' + units).then((response)=>{
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
        })
}

weatherForm.addEventListener('submit', (e) => {
    //checkbox checker (on switch)
    const check = document.querySelector('#celsius').checked
    e.preventDefault()

    message1.textContent = 'Fetching your weather...'
    message2.textContent = ''

    const location = search.value

    //the unit choices are hard-coded in
    if(check){
        getWeather(location, units='m')
    } else { 
        getWeather(location, units='f')
        }
})