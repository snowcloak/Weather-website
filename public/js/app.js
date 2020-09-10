//this is client side JavaScript

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'Fetching your weather...'
    message2.textContent = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
        }

    })
})
})