// DOM Elements
const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const fields = document.querySelectorAll('.field');
const contactForm = document.querySelector('#contact-form');
const checkboxField = document.querySelector('#agree');
const successToast = document.querySelector('#toast');

// Variables
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let errors = {
    "empty": "This field is required",
    "invalidEmail": "Please enter a valid email address",
};

// Function: Validate fields (text and email)
const validateField = (field) => {
    let errorPlaceholder = field.nextElementSibling;

    field.classList.remove('has-error');
    errorPlaceholder.textContent = '';

    // Empty state
    if (field.value.length < 1) {
        field.classList.add('has-error');
        errorPlaceholder.textContent = errors.empty;
        return false;
    }

    // Invalid email
    if (field.getAttribute('type') === 'email' && field.value.length > 0 && !emailRegex.test(field.value)) {
        field.classList.add('has-error');
        errorPlaceholder.textContent = errors.invalidEmail;
        return false;
    }

    return true;
}

// Function: Validate options (only readio inputs)
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
        return false;
    } else {
        errorPlaceholder.textContent = '';
        return true;
    }
};

// Function: Validate checkbox
const validateCheckbox = (checkbox) => {
    const errorPlaceholder = document.querySelector('#checkbox-error-placeholder');

    if (!checkbox.checked) {
        errorPlaceholder.textContent = 'To submit this form, please consent to being contacted';
        return false;
    } else {
        errorPlaceholder.textContent = '';
        return true;
    }
}


// Query Type Handler
queryTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        validateOptions(queryTypeInputs);
        queryTypeInputs.forEach(unselectOption => {
            unselectOption.parentElement.classList.remove('bg-light-green');
        });
        input.parentElement.classList.add('bg-light-green');
    });
});

// Call form validation function
fields.forEach(field => {
    field.addEventListener('focusout', () => {
        validateField(field);
    });
});

// Call validate checkbox function when checking/unchecking the checkbox
checkboxField.addEventListener('change', () => {
    validateCheckbox(checkboxField);
});

// Call functions when submit the form
contactForm.addEventListener('submit', (e) => {
    let formHasError = false;
    e.preventDefault();

    fields.forEach(field => {
        formHasError = validateField(field);
    });
    formHasError = validateOptions(queryTypeInputs);
    formHasError = validateCheckbox(checkboxField);

    if (formHasError) {
        successToast.classList.remove('-translate-y-full', 'top-0');
        successToast.classList.add('top-5', 'translate-y-0');

        setTimeout(() => {
            successToast.classList.remove('top-5', 'translate-y-0');
            successToast.classList.add('-translate-y-full', 'top-0');
            location.reload();
        }, 1150);
    }
});