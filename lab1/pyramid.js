function pyramid(height) {
let output = "";
for (let i = 0; i < height; i++) {
    for (let j = 0; j < height - i; j++) {
        output += ' ';
    }
    for (let j = 0; j < 2*i + 1; j++) {
        output += '*';
    }
    output += '\n';
}
console.log(output);
}

function invertedPyramid(height) {
let output = "";
for (let i = height-1; i >= 0; i--) {
    for (let j = 0; j < height - i; j++) {
        output += ' ';
    }
    for (let j = 0; j < 2*i + 1; j++) {
        output += '*';
    }
    output += '\n';
}
console.log(output);
}

pyramid(9);
invertedPyramid(9);
