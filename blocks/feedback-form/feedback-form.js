
const generateFeedbackForm = () => {
    const $feedbackFormWrapper = document.createElement('form');
    $feedbackFormWrapper.name = 'feedbackForm';

    const $nameField = generateFormField('Name', 'text', 'name');
    const $emailField = generateFormField('Email', 'email', 'email');

    const experiences = ['Good', 'Moderate', 'Bad'];
    const $experienceField = generateDropdownField('Overall Experience', experiences, 'overallExperience');

    const $commentField = generateTextAreaField('Comment', 'comment');

    const $submitButton = generateSubmitButton();

    $feedbackFormWrapper.append($nameField);
    $feedbackFormWrapper.append($emailField);
    $feedbackFormWrapper.append($experienceField);
    $feedbackFormWrapper.append($commentField);
    $feedbackFormWrapper.append($submitButton);

    $feedbackFormWrapper.addEventListener('submit', submitHandler);
    return $feedbackFormWrapper;
};

const submitHandler = async (evt) => {
    evt.preventDefault();
    const url = `https://main--my-franklin-demo-website--adobe-bhupesh.hlx.page/feedback-form`;

    const formEl = document.forms.feedbackForm;
    const formData = new FormData(formEl);
    debugger;
    const name = formData.get('name');
    const email = formData.get('email');
    const overallExperience = formData.get('overallExperience');
    const comment = formData.get('comment');

    const data = {
        "data": {
            "name": name,
            "emailId": email,
            "overallExperience": overallExperience,
            "comments": comment
        }
    }

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (resp.ok) {
        console.log('form submitted...');
    }
};

const getLabelForField = (label, fieldId) => {
    const $label = document.createElement('label');
    $label.innerHTML = label;
    $label.htmlFor = fieldId;
    return $label;
};

const generateFormField = (label, fieldType, fieldId) => {
    const $fieldWrapper = document.createElement('div');
    const $label = getLabelForField(label, fieldId);
    $fieldWrapper.append($label);

    const $field = document.createElement('input');
    $field.type = fieldType;
    $field.name = fieldId;
    $field.id = fieldId;
    $fieldWrapper.append($field);
    return $fieldWrapper;
};

const generateTextAreaField = (label, fieldId) => {
    const $fieldWrapper = document.createElement('div');
    $fieldWrapper.classList.add('field-wrapper');
    const $label = getLabelForField(label, fieldId);
    $fieldWrapper.append($label);

    const $textArea = document.createElement('textarea');
    $textArea.classList.add('field');
    $textArea.rows = 5;
    $textArea.cols = 20;
    $textArea.id = fieldId;
    $textArea.name = fieldId;
    $fieldWrapper.append($textArea);
    return $fieldWrapper;
};

const generateDropdownField = (label, values, fieldId) => {
    const $fieldWrapper = document.createElement('div');
    $fieldWrapper.classList.add('field-wrapper');
    const $label = getLabelForField(label, fieldId);
    $fieldWrapper.append($label);

    const $dropdown = document.createElement('select');
    $dropdown.classList.add('field');
    $dropdown.name = fieldId;
    $fieldWrapper.append($dropdown);

    values.forEach((opt) => {
        const $option = document.createElement('option');
        $option.value = opt;
        $option.innerHTML = opt;
        $dropdown.append($option);
    });
    return $fieldWrapper;
};

const generateSubmitButton = () => {
    const $button = document.createElement('button');
    $button.type = 'submit';
    $button.innerText = 'Submit';
    return $button;
};

export default async function decorate(block) {
    const $form = generateFeedbackForm();
    block.append($form);
};
