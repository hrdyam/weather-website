
const weatherForm = document.querySelector('form');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
// message1.textContent = '';
// message2.textContent = '';
weatherForm.addEventListener('submit',(e)=> {
        e.preventDefault();
        message1.textContent = 'Loading...';
        message2.textContent = '';
        const address = document.getElementById('address').value;
        fetch("http://localhost:3000/weather?address="+address).then((response) =>{
            response.json().then((data) =>{
            if (data.error){
                return message1.textContent = data.error;
            }
            message1.textContent = data.location;
            message2.textContent = data.forecast;
            console.log('location : ' + data.location);
            console.log('forecast : ' + data.forecast);
        });
    });
});
