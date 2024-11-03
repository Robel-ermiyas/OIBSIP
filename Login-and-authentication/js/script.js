const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const password = this.elements[2].value;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful for ' + name);
    this.reset();

    container.style.display = 'none';
});

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = this.elements[0].value;
    const password = this.elements[1].value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
        alert('Login successful! Welcome back, ' + users[email].name);
        container.style.display = 'none';
    } else {
        alert('Invalid credentials. Please try again.');
    }
    this.reset();
});

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
