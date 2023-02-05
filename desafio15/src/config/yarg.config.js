const { number } = require('yargs');

const argv = require('yargs')
.option('p', {
    alias: 'port',
    type: number
})
.argv;
// console.log(argv);

module.exports = argv ;