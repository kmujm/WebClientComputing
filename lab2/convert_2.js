let fs = require('fs');
let array = fs.readFileSync(__dirname+'/' + '2.md').toString().split("\n");
let i = -1;
let fn;
let wc;
let word, word2;

while(++i < array.length) {
    word = array[i].split(" ");
    if(word[0] == "###") fn = word[1];
    else continue;

    while(++i < array.length) {
        let word2 = array[i].split(" ");
        if(word2[0] == "```js") break;
    }

    wc = "";
    while(++i < array.length) {
        word2 = array[i].split(" ");
        if(word2[0] == "```") break;
        wc += array[i] + "\n";
    }

    fs.writeFileSync(__dirname+'/' + fn + '.js', wc);
}
