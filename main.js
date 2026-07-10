(() => {


    const icons = {
        show:
            `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>`,
        hide:
            `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`,
    }
    const elements = {

        form : document.querySelector('#cust-form'),
        inputs:
            {
            email: document.querySelector('#email-input'),
            country: document.querySelector('#country-input'),
            postalCode: document.querySelector('#postal-code-input'),
            password: document.querySelector('#password-input'),
            passwordConfirm: document.querySelector('#password-confirm-input'),
        },
        messageSlots:
            {
            email: document.querySelector('#email-msg'),
            country: document.querySelector('#country-msg'),
            postalCode: document.querySelector('#postal-code-msg'),
            password: document.querySelector('#password-msg'),
            passwordConfirm: document.querySelector('#password-confirm-msg'),
        },
        buttons:
            {
            passwordShow: document.querySelector('#password-show'),
            passwordConfirmShow: document.querySelector('#password-confirm-show'),
            createAccount: document.querySelector('#create-account'),
        },
        labels:
            {
                password: document.querySelector('#password-label'),
            }
    }

    elements.labels.password.addEventListener('mouseenter', (e) => {e.target.nextElementSibling.className = 'password-requirements active'});
    elements.labels.password.addEventListener('mouseleave', (e) => {e.target.nextElementSibling.className = 'password-requirements'})

    elements.buttons.passwordShow.innerHTML = icons.show;
    elements.buttons.passwordShow.className = 'show-pw pw secondary';
    elements.buttons.passwordShow.addEventListener( 'click', (e) => togglePasswordText(e, icons) );

    elements.buttons.passwordConfirmShow.innerHTML = icons.show;
    elements.buttons.passwordConfirmShow.className = 'show-pw pw secondary';
    elements.buttons.passwordConfirmShow.addEventListener( 'click', (e) => togglePasswordText(e, icons) );

    elements.form.addEventListener( 'submit', (e) => {
        e.preventDefault();
        if (!elements.form.checkValidity()) {
            Object.values(elements.inputs).forEach(input => {
                const name = input.name;

                const slot = elements.messageSlots[name];
                handleValidation(input, slot)
            });
            displayMessages(elements.messageSlots);
            return;
        }

        if (elements.inputs.password.value !== '' && elements.inputs.passwordConfirm.value !== '') {
            const pw = elements.inputs.password.value;
            const pwc = elements.inputs.passwordConfirm.value;
            const check = checkPasswords(pw, pwc);
            if (check === false) { return; }
        }

        const data = collectFormSubmission(e);
        console.log(data);
    });

    setInputListeners(elements);
    populateCountrySelect(elements.inputs.country);
})();

const messageQueue = {
    email: [],
    country: [],
    postalCode: [],
    password: [],
    passwordConfirm: [],
}

function populateCountrySelect(selectInput) {
    const defaultOp = new Option('None', '', true, true);
    defaultOp.className = 'select-default';
    defaultOp.disabled = true;
    selectInput.add(defaultOp);
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua & Deps",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Rep",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo {Democratic Rep}",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland {Republic}",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea North",
        "Korea South",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar, {Burma}",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "St Kitts & Nevis",
        "St Lucia",
        "Saint Vincent & the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome & Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad & Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    countries.forEach(op => {
        selectInput.add(new Option(op, op))
    });
}

function collectFormSubmission(event){
    const data = new FormData(event.currentTarget);
    return Object.fromEntries(data.entries());
}


function togglePasswordText(event, icons){
    const btn = event.target;
    const input = btn.previousElementSibling;
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
    if (btn.className === 'show-pw pw secondary') {
        btn.innerHTML = icons.hide;
        btn.className = 'hide-pw pw secondary';
    } else {
        btn.innerHTML = icons.show;
        btn.className = 'show-pw pw secondary';
    }
}



function handleValidation(input, slot){

    const name = input.name;
    const queue  = messageQueue[name];

    if (name === 'country' && input.value !== ''){

        queue.length = 0;
        slot.textContent = '';
        slot.className = 'msg';
        updateInputClass(input, 'success');
        return;
    } else if (name === 'country' && input.value === '') {

        const msg = createMessage('country', 'You must select a country.', 'err');
        queue.push(msg);
        updateInputClass(input, 'error');
        return;
    }
    if (name === 'password'){
    const checks = validatePassword(input.value);
    if (checks.lower === false) {
        const msg = createMessage('password', 'Password must contain at least one lowercase letter.');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
    if (checks.upper === false) {
        const msg = createMessage('password', 'Password must contain at least one uppercase letter.');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
    if (checks.num === false) {
        const msg = createMessage('password', 'Password must contain at least one number.');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
    if (checks.symbol === false) {
        const msg = createMessage('password', 'Password must contain at least one of the allowed symbols.');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
    }

    if (name === 'passwordConfirm') {
        const pw = document.querySelector('#password-input');
    }

    if (input.validity.valid && name !== 'country') {
        queue.length = 0;
        slot.textContent = '';
        slot.className = 'msg';
        updateInputClass(input, 'success');
    } else if (input.validity.valueMissing && name !== 'country') {
        if (queue.length) deleteFirstMsg(queue);
        const msg = createMessage(name, input.validationMessage, 'err');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
    else if (!input.validity.valid && name !== 'country'){
        if (queue.length) deleteFirstMsg(queue);
        const msg = createMessage(name, input.validationMessage, 'err');
        queue.push(msg);
        updateInputClass(input, 'error');

    }
    else if (!input.validity.typeMismatch && name !== 'country'){
        if (queue.length) deleteFirstMsg(queue);
        const msg = createMessage(name, input.validationMessage, 'err');
        queue.push(msg);
        updateInputClass(input, 'error');
    }
}

function displayMessages(messageSlots){
    Object.values(messageQueue).forEach(queue => {
        queue.forEach(msg => {
            const slot = messageSlots[msg.name];
            slot.textContent = msg.text;
            slot.classList.add('msg');
            msg.type === 'err' ? slot.classList.add('invalid') : slot.classList.add('valid');
        });
    });
}

function deleteFirstMsg(msgQueue){
    msgQueue.shift();
}

function createMessage(name, text, type) {
    return {
        name: name,
        text: text,
        type: type
    }
}

function setInputListeners(elements){
    Object.values(elements.inputs).forEach(input => {
        const slot = elements.messageSlots[input.name];

        input.addEventListener('input', () => {
            handleValidation(input, slot);
            displayMessages(elements.messageSlots);
        });

        input.addEventListener('focusout', () => {
            handleValidation(input, slot);
            displayMessages(elements.messageSlots);
        });
    });
}

function updateInputClass(input, status){

    switch(status) {
        case 'success':

            if (input.classList.contains('is-invalid')) {input.classList.remove('is-invalid'); }
            input.classList.add('is-valid');
            break;
        case 'error':

            if (input.classList.contains('is-valid')) {  input.classList.remove('is-valid'); }
            input.classList.add('is-invalid');
            break;
    }
}

function checkPasswords(pwA, pwB) {
    return pwA === pwB;
}

const passwordRequirements = {
    regex: {
        lower: /[a-z+]/,
        upper: /[A-Z+]/,
        num: /\d/,
        symbols: /[!"#$%&*+,-./:;?@]/,
    },
}

function validatePassword(password) {
    const symbols = passwordRequirements.regex.symbols;
    const lower = passwordRequirements.regex.lower;
    const upper = passwordRequirements.regex.upper;
    const num = passwordRequirements.regex.num;

    console.log(password);
    /*
    console.log(symbols);
    console.log(regex

     */
    return {
        lower: passwordRequirements.regex.lower.test(password),
        upper: passwordRequirements.regex.upper.test(password),
        num: passwordRequirements.regex.num.test(password),
        symbol: passwordRequirements.regex.symbols.test(password)
    }
}