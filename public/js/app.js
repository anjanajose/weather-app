const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')
const msg4 = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) { 
                msg1.textContent = ''
                msg2.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.summary
                msg3.textContent = data.currentTemp
                msg4.textContent = data.rainChance
            }
        })
    })
})