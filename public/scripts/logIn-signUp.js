async function signUpLogInForm(event) {
    event.preventDefault();
    console.log(event.target);
    if (event.target.hasAttribute('data-id')) {
        console.log('LogIn - started');

        const email = document.querySelector('#email-signin').value.trim();
        const password = document.querySelector('#password-signin').value.trim();

        console.log('Input values: ', email, password);

        if (email && password) {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Log in succesfull');
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } else {
            alert("One of the input areas doesn't have a value")
        }
    } else {

        console.log('signup - started');

        const first_name = document.querySelector('#first-name').value.trim();
        const last_name = document.querySelector('#last-name').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();

        console.log('Input values: ', first_name, last_name, email, password);

        if (first_name && last_name && email && password) {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('Account created');

                document.location.replace('/dashboard');
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
}

document
    .querySelector('#signUp-logIn-form')
    .addEventListener('submit', signUpLogInForm);
