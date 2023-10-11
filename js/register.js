const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");
const elName = document.getElementById("name");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");
const elFormMessage = document.getElementById("form-message");

const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});
elAuthForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = elEmail.value.trim();
    const name = elName.value.trim();
    const phone = elPhone.value.trim();
    const address = elAddress.value.trim();
    const password = elPassword.value.trim();

    const data = {name, email, password, phone, address };

    API.post('/users/register', data)
    .then(function (responseRegister) {
        API.post('/auth/login', { email, password}).then(function (responseLogin) {
            window.location.href = 'index.html';
        });
    })
    .catch(function (error) {
        // elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông tin đăng nhập không đúng, vui lòng nhập lại.</div>`;
        // elEmail.value ='';
        // elPassword.value = '';
    });
    
});