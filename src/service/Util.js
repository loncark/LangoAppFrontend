export function isInputInvalid(...inputs) {
    const forbiddenCharacters = ['$', '%', ';', '<', '>', ' '];

    for (const input of inputs) {
        if (forbiddenCharacters.some(char => input.includes(char)) || input === '') {
            return true;
        }
    }
    return false;
}

export function isInputInvalidSpaceAllowed(...inputs) {
    const forbiddenCharacters = ['$', '%', ';', '<', '>'];

    for (const input of inputs) {
        if (forbiddenCharacters.some(char => input.includes(char)) || input === '') {
            return true;
        }
    }
    return false;
}

export function isValidDateFormat(dateString) {
    const dateFormatRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;  
    return dateFormatRegex.test(dateString);
  }
