const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const fields = document.querySelectorAll('.field');
const contactForm = document.querySelector('#contact-form');
const checkboxField = document.querySelector('#agree');


let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let errors = {
    "empty": "This field is required",
    "invalidEmail": "Please enter a valid email address",
}


const validateField = (field) => {
    let errorPlaceholder = field.nextElementSibling;

    field.classList.remove('has-error');
    errorPlaceholder.textContent = '';

    // Empty state
    if (field.value.length < 1) {
        field.classList.add('has-error');
        errorPlaceholder.textContent = errors.empty;
    }

    // Invalid email
    if (field.getAttribute('type') === 'email' && field.value.length > 0 && !emailRegex.test(field.value)) {
        field.classList.add('has-error');
        errorPlaceholder.textContent = errors.invalidEmail;
    }
}

const validateOptions = (options) => {
    const errorPlaceholder = document.querySelector('#option-error-placeholder');

    let queryTypeChecked = false;

    options.forEach(option => {
        if (option.checked) {
            queryTypeChecked = true;
        }
    });

    if (!queryTypeChecked) {
        errorPlaceholder.textContent = 'Please select a query type';
    } else {
        errorPlaceholder.textContent = '';
    }
};

const validateCheckbox = (checkbox) => {
    const errorPlaceholder = document.querySelector('#checkbox-error-placeholder');

    if (!checkbox.checked) {
        errorPlaceholder.textContent = 'To submit this form, please consent to being contacted';
    } else {
        errorPlaceholder.textContent = '';
    }
}


/**
 * Query Type Handler
 */
queryTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        validateOptions(queryTypeInputs);
        queryTypeInputs.forEach(unselectOption => {
            unselectOption.parentElement.classList.remove('bg-light-green');
        });
        input.parentElement.classList.add('bg-light-green');
    });
});

/**
 * Form validation
 */
fields.forEach(field => {
    field.addEventListener('focusout', () => {
        validateField(field);
    });
});

checkboxField.addEventListener('change', () => {
    validateCheckbox(checkboxField);
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fields.forEach(field => {
        validateField(field);
    });
    validateOptions(queryTypeInputs);
    validateCheckbox(checkboxField);
});