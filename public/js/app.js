const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.querySelector('input').value;
    const errorMsg = document.querySelector('#error-message');
    const weatherMsg1 = document.querySelector('#weather-message-1');
    const weatherMsg2 = document.querySelector('#weather-message-2');

    errorMsg.textContent = '';
    weatherMsg1.textContent = 'Loading...';
    weatherMsg2.textContent = '';
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                errorMsg.textContent = `Error: ${data.error}`;
                weatherMsg1.textContent = ``;
                weatherMsg2.textContent = ``;
            } else {
                errorMsg.textContent = ``
                weatherMsg1.textContent = `Location: ${data.location}.`;
                weatherMsg2.textContent = `Forecast: ${data.forecast}`;
            } 
        })
    })
})