// script.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send form data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        // Optionally, you can redirect the user to another page after successful submission
        // window.location.href = '/success.html';
    })
    .catch(error => console.error('Error:', error));
});
