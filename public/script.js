document.getElementById('sendOtpBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error: ' + error.message;
    });
  });
  
  document.getElementById('verifyOtpBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
    fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error: ' + error.message;
    });
  });
  