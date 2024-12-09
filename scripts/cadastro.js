const checkboxInput = document.getElementById('checkbox');
const checkbox = document.querySelector('.label-checkbox__checkbox');

checkboxInput.addEventListener('click', function() {
    if (checkboxInput.checked) {
        checkbox.classList.add('checked');
    } else {
        checkbox.classList.remove('checked');
    }
})
