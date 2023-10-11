const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");
const elFormMessage = document.getElementById("form-message");

const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});
elAuthForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = elEmail.value.trim();
    const password = elPassword.value.trim();

    const data = {email, password };

    API.post('/auth/login',data)
    .then(function (response) {
        window.location.href = 'index.html';
    })
    .catch(function (error) {
        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông tin đăng nhập không đúng, vui lòng nhập lại.</div>`;
        elEmail.value ='';
        elPassword.value = '';
    })
    
})