document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect the form data
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var companyName = document.getElementById('company-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;

    // Generate a unique token
    var token = Math.random().toString(36).substr(2);

    // Prepare the email parameters
    var templateParams = {
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        email: email,
        phone: phone,
        message: message,
        verification_link: `https://yourdomain.com/verify.html?token=${token}`
    };

    // Send the email using EmailJS
    emailjs.send('service_50ijcmk', 'template_9ioxsnj', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Verification email has been sent to your email address. Please check your inbox.');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong. Please try again.');
        });

    // Store the token and email in localStorage (for demonstration purposes)
    // In a real application, you should store this in your database
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
});
