/*
    npm package: colors

    Allows to change terminal colors

    https://www.npmjs.com/package/colors
*/ 

const colors = require('colors');

colors.setTheme({
    question: "yellow",
    answer: "white",
    waiting: "gray",
    error: "red",
    warning: "magenta"
});

module.exports = colors;