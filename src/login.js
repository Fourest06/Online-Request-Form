let globalEmail = "";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');
    let emailText = document.getElementById('email').value;
    let passwordText = document.getElementById('password').value;
    const emailRegex = /@bec\.edu\.ph$/;
    let validEmail = false;
    let validPassword = false;
    
    // Email error
    if (!emailText) {
        emailError.innerText = "Email is required";
        emailError.style.display = 'block';
        email.classList.add('error');
        validEmail = false;
    } 
    else if (!emailRegex.test(emailText)) {
        emailError.innerText = "Please use your student email (@bec.edu.ph)";
        emailError.style.display = 'block';
        email.classList.add('error');
        validEmail = false;
    }
    else {
        email.classList.remove('error');
        emailError.style.display = 'none';
        validEmail = true;
    }

    // Password error
    if (!passwordText) {
        passwordError.innerText = "Password is required";
        passwordError.style.display = 'block';
        password.classList.add('error');
        validPassword = false;
    } 
    else if (passwordText !== "password") {
        passwordError.innerText = "Invalid password";
        passwordError.style.display = 'block';
        password.classList.add('error');
        validPassword = false;
    }
    else {
        passwordError.style.display = 'none';
        password.classList.remove('error');
        validPassword = true;
    }

    // Complete form
    if (validEmail && validPassword) {
        globalEmail = emailText; 
        localStorage.setItem("userEmail", globalEmail); 
        window.location.href = "Info/Info.html"; 
    }
});
