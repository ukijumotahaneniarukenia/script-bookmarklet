// At least one LOWERCASE character:
let lowerCasePattern = /^(?=.*[a-z]).+$/

// At least one UPPERCASE character:
let upperCasePattern = /^(?=.*[A-Z]).+$/

// At least one NUMBER:
let numberPattern = /^(?=.*[\d]).+$/

// At least one SPECIAL character:
let specialCharacterPatter = /([-+=_!@#$%^&*.,;:'\"<>/?`~\[\]\(\)\{\}\\\|\s])/

// At least 8 characters in the screen:
let characterCountPattern = /^.{8,}/

// Flag to keep track if password is less than 50 characters:
let isLessThan50 = true
