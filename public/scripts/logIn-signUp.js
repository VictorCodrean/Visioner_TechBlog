async function signUpForm(event) {
    event.preventDefault();
    console.log('signup - started');

    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log('Input values: ', firstName, lastName, email, password);

    if (firstName && lastName && email && password) {
        const response = await fetch('/api/user/sign-up', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // console.log('Account created');

            document.location.replace('/login');
        } else {
            if (response.statusText === 'Validation isEmail on email failed') {
                alert('Email not valid')
            } else if (response.statusText === 'Validation isPassword on password failed') {
                alert('Password must be at least 8 characters long')
            } else {
                alert(response.statusText);
                console.log(response.statusText);
            }
        }
    } else {
        alert("One of the input areas doesn't have a value")
    }
}



document
    .querySelector('#signUp-form')
    .addEventListener('submit', signUpForm);


