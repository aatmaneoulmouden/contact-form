/**
 * Query Type Handler
 */

const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
queryTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        queryTypeInputs.forEach(unselectOption => {
            unselectOption.parentElement.classList.remove('bg-light-green');
        });
        input.parentElement.classList.add('bg-light-green');
    })
})