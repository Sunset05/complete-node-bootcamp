const fs = require('fs');

const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOuput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOuput);
console.log('File written!');