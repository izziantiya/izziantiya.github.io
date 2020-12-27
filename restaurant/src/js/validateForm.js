var form = document.querySelector('.reserv');

var formName = form.querySelector('.name');
var formTel = form.querySelector('.tel');
var fields = form.querySelectorAll('.field');
var radio = form.querySelectorAll('.time');

form.addEventListener('submit', function (event) {
    removeValidation();

    var one = fieldsValidate();
    var two = nameValidate();
    var three = telValidate();
    var four = radioValidate();

    if (one || two || three || four)
        event.preventDefault();
})

function createValidation(text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = text;
    return error;
}

function removeValidation() {
    var errors = form.querySelectorAll('.error');
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

    for (var i = 0; i < fields.length; i++) {
        fields[i].style.borderColor = '#fb8b24';
    }

    document.getElementById('error').innerHTML = '';
}

function fieldsValidate() {
    var cntError = 0;
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            fields[i].style.borderColor = 'red';
            var error = createValidation('Заполните это поле');
            fields[i].parentElement.insertBefore(error, fields[i]);
            cntError++;
        }
    }
    return cntError > 0;
}

function nameValidate() {
    if (formName.validity.patternMismatch) {
        var error = createValidation('Используйте только русские буквы');
        formName.style.borderColor = 'red';
        formName.parentElement.insertBefore(error, formName);
        return true;
    }
    return false;
}

function telValidate() {
    if (formTel.validity.patternMismatch) {
        var error = createValidation('Используйте правильный формат');
        formTel.style.borderColor = 'red';
        formTel.parentElement.insertBefore(error, formTel);
        return true;
    }
    return false;
}

function radioValidate() {
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return false;
        }
    }
    document.getElementById('error').innerHTML = 'Выберете время!';
    return true;
}

