// Event listener for the send code button
document.getElementById('send-code-button').addEventListener('click', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Collect the email address entered by the user
    var email = document.getElementById('email').value;

    // Generate a verification code
    var verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Prepare the email parameters
    var templateParams = {
        to_name: email,  // Use the entered email as the recipient
        verification_code: verificationCode,
        // Other parameters as needed
    };

    // Send the email using EmailJS
    emailjs.send('service_50ijcmk', 'template_m65dx7k', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Verification code has been sent to ' + email + '. Please check your inbox.');

            // Store the verification code and email in sessionStorage (for demonstration purposes)
            // In a real application, you should store this securely in your backend or database
            sessionStorage.setItem('verificationCode', verificationCode);
            sessionStorage.setItem('email', email);
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong. Please try again.');
        });
});

// Event listener for the registration form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect the form data
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var collegeName = document.getElementById('college-name').value;
    var email = document.getElementById('email').value;
    var verificationCodeInput = document.getElementById('verification-code').value;
    var storedVerificationCode = sessionStorage.getItem('verificationCode');

    // Check if the verification code matches
    if (verificationCodeInput === storedVerificationCode) {
        // Show the success message
        showSuccessMessage();
    } else {
        // Show the error message
        showErrorMessage();
    }
});

function showSuccessMessage() {
    var successMessage = document.querySelector('.success-message');
    var registrationForm = document.querySelector('.registration-form');

    // Hide the registration form and show the success message
    registrationForm.style.display = 'none';
    successMessage.style.display = 'block';
}

function showErrorMessage() {
    // Display an alert or message to the user indicating the error
    alert('Verification code is incorrect. Please try again.');
}
