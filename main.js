const wrapper = document.querySelector('.wrapper');
let formBtn = document.forms.signupForm.querySelector('.form-btn');
let signupForm = document.forms.signupForm;
let FormSuccess;
let signupBtn;
let btnTampl;
let formNow = document.forms.signupForm;
let firstName = signupForm.firstName;
let lastName = signupForm.lastName;
let phone = signupForm.phoneNumber;
let email = signupForm.email;
let emailMemory;
let passwordMemory;
let checkbox = signupForm.agree;
let password = signupForm.password;
let loginForm;
let profileForm;
let msgTemplate;
let loginEmail;
let loginPass;
let counter;
const validationName = /^[а-щА-ЩЬЮЯҐЄIІЇієїґ]{2,}$/;
const validationEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validationPass = /^[a-zA-Z0-9]{8,}$/;
const validationPhone = /^\d{10}$/;
let msglastAndFirstName = 'Тільки кирилиця, від 2-х символів без пробілів';
let msgEmail = 'Більше 8-ми символів зі знаком "@" та "."';
let msgPhone = '10 цифр без пробілів';
let msgPassword = 'Не менше 8-ми символів без пробілів';


function insertNewForm(formInsert) {
    formBtn = wrapper.firstElementChild.querySelector('.form-btn');
    wrapper.firstElementChild.remove();
    wrapper.insertAdjacentHTML('beforeend', `${formInsert}`);
    formBtn = wrapper.firstElementChild.querySelector('.form-btn');
}

function insertMsgTemplate(className, title, textMsgBtn) {
    wrapper.firstElementChild.remove();
    wrapper.insertAdjacentHTML('beforeend', `<div class="msg">
    <div class="msg-text">${title}</div>
    <button class="btn ${className}" type="button">${textMsgBtn}</button>
  </div>`);
    formBtn = wrapper.firstElementChild.querySelector(`.${className}`);
}

function unlockFormBtn(formName) {
    FormSuccess = formName.querySelectorAll('.form-group');
    formBtn.removeAttribute('disabled');
    for (success of FormSuccess) {
        if (!success.classList.contains('success')) {
            formBtn.setAttribute('disabled', 'disabled');
        }
    }
}

function validationLoginInput(validation, formName, input, text) {
    let formGroup = input.closest('.form-group');
    let inputMsg = formGroup.querySelector('.form-msg');
    formBtn = formName.querySelector('.form-btn');
    if (!(validation === input.value)) {
        inputMsg.textContent = `${text}`
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    } else {
        inputMsg.textContent = ``
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }
}

function validationInput(validation, inputName, textMessage, formName) {
    let formGroup = inputName.closest('.form-group');
    let messageInput = formGroup.querySelector('.form-msg');
    inputName.addEventListener('focus', (e) => {
        if (inputName.value === '') {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `Це поле обов'язкове. Не може бути порожнім`;
        } else if (!validation.test(inputName.value) && !(inputName.value === passwordMemory)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `${textMessage}`;
        } else if (inputName.value === passwordMemory) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `Пароль збігається з попереднім`;
        } else {
            formGroup.classList.add('success');
            formGroup.classList.remove('error');
            messageInput.textContent = `Все вірно, продовжуй`;
        }
    })
    inputName.addEventListener('input', (e) => {
        if (inputName.value === '') {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `Це поле обов'язкове. Не може бути порожнім`;
        } else if (!validation.test(inputName.value)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `${textMessage}`;
        } else if (inputName.value === passwordMemory) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            messageInput.textContent = `Пароль збігається з попереднім`;
        } else {
            formGroup.classList.add('success');
            formGroup.classList.remove('error');
            messageInput.textContent = `Все вірно, продовжуй`;
        }
        unlockFormBtn(formName);
    })
    inputName.addEventListener('blur', (e) => {
        messageInput.textContent = ``;
    })
}

function verificationCheckbox(checkbox) {
    checkbox.addEventListener('click', (e) => {
        e.target.closest('.form-group').classList.toggle('success');
        formBtn.removeAttribute('disabled');
        if (checkbox.checked) {
            FormSuccess = signupForm.querySelectorAll('.form-group');
            unlockFormBtn(signupForm);
        } else {
            formBtn.setAttribute('disabled', 'disabled');
        }
    })
}

function validationLoginForm(formName) {
    counter = 0;
    FormSuccess = formName.querySelectorAll('.form-group');
    for (success of FormSuccess) {
        if (success.classList.contains('success')) {
            counter += 1;
        }
    }
}

verificationCheckbox(checkbox);
validationInput(validationName, firstName, msglastAndFirstName, formNow);
validationInput(validationName, lastName, msglastAndFirstName, formNow);
validationInput(validationPhone, phone, msgPhone, formNow);
validationInput(validationEmail, email, msgEmail, formNow);
validationInput(validationPass, password, msgPassword, formNow);

wrapper.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target === document.forms.signupForm) {
        emailMemory = signupForm.email.value;
        passwordMemory = signupForm.password.value;
        insertMsgTemplate(`msg-btn`, 'Вітаємо, успішна реєстрація!', 'Увійти')
    };

    if (e.target === document.forms.loginForm) {
        validationLoginInput(emailMemory, loginForm, loginForm.email, 'Такого email не знайдено!');
        validationLoginInput(passwordMemory, loginForm, loginForm.password, 'Не правильний пароль!');
        validationLoginForm(loginForm);
        console.log(passwordMemory, counter);

        if (counter === 2) {
            insertNewForm(`<form action="" class="form" name="profileForm">
            <div class="form-group">
              <label class="form-label" for="firstName">Ваше ім'я *</label>
              <input class="form-input" type="text" id="firstName" name="firstName" placeholder="Введіть ваше ім'я" required>
              <div class="form-msg"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="lastName">Ваше прізвище *</label>
              <input class="form-input" type="text" id="lastName" name="lastName" placeholder="Введіть ваше прізвище">
              <div class="form-msg"></div>
            </div>
            <div class="form-group">
              <label class="form-label phone-label" for="phoneNumber">Номер телефону *</label>
              <div class="input-set input-set-phone">
                <div class="phone-item">+38</div><input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Введіть ваш номер">
              </div>
              <div class="form-msg"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="email">Електронна пошта *</label>
              <input class="form-input" type="email" id="email" name="email" placeholder="Введіть ваш email" readonly>
              <div class="form-msg"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="password">Новий пароль *</label>
              <div class="input-set input-set-password">
                <input type="password" id="password" name="password" placeholder="Введіть новий пароль"><button class="show-password" type="button"></button>
              </div>
              <div class="form-msg"></div>
            </div>
            <button class="form-btn js_save-btn" type="submit" name="saveBtn">Зберегти зміни</button>
          </form>`);
            profileForm = document.forms.profileForm;
            firstName = profileForm.firstName;
            lastName = profileForm.lastName;
            phone = profileForm.phoneNumber;
            email = profileForm.email;
            email.closest('.form-group').classList.add('success');
            email.value = emailMemory;
            password = profileForm.password;
            validationInput(validationName, firstName, msglastAndFirstName, profileForm);
            validationInput(validationName, lastName, msglastAndFirstName, profileForm);
            validationInput(validationPhone, phone, msgPhone, profileForm);
            validationInput(validationPass, password, msgPassword, profileForm);
            unlockFormBtn(profileForm);
        }
    };

    if (e.target === document.forms.profileForm) {
        validationInput(validationName, firstName, msglastAndFirstName, profileForm);
        validationInput(validationName, lastName, msglastAndFirstName, profileForm);
        validationInput(validationPhone, phone, msgPhone, profileForm);
        validationInput(validationPass, password, msgPassword, profileForm);
        insertMsgTemplate(`msg-btn`, 'Вітаємо, дані профіля змінено!', 'Увійти');
        passwordMemory = password.value;
    };
});

wrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('msg-btn')) {
        insertNewForm(`<form action="" class="form" name="loginForm">
        <div class="form-group">
          <label class="form-label" for="email">Електронна пошта *</label>
          <input class="form-input" type="email" id="email" name="email" placeholder="Введіть ваш email">
          <div class="form-msg"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Пароль *</label>
          <div class="input-set input-set-password">
            <input type="password" id="password" name="password" placeholder="Введіть пароль"><button class="show-password" type="button"></button>
          </div>
          <div class="form-msg"></div>
        </div>
        <button class="form-btn js_login-btn" type="submit" name="loginBtn">Увійти</button>
      </form>`);
        loginForm = document.forms.loginForm;
    };
});