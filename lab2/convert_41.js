let fs = require('fs');
let array = fs.readFileSync(__dirname + '/' + '41.md').toString().split('\n');
let i = -1;
let word, word2;
let fn;
let language;

while(++i < array.length) {
    word = array[i].split(' ');
    if(word[0] === '#') fn = word[1];
    else continue;

    while(++i < array.length) {
        word2 = array[i].split(' ');
        if(word2[0] === '```javascript') {
            language = 'js'; 
            break;
        }
        else if(word2[0] === '```html') {
            language = 'html';
            break;
        }
    }

    wc = '';
    while(i++ < array.length) {
        word2 = array[i].split(' ');
        if(word2[0] === '```') break;
        wc += array[i] + '\n'
    }
    
    fs.writeFileSync(__dirname + '/' + fn + '.' + language, wc);
}