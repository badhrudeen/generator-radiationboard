'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const config = require('./config');
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.log('Initializing...');
    }
    start() {
        this.log('Do something...');
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Enter a name for the new component (i.e.: myNewComponent): '
        }]).then((answers) => { 
            // create destination folder 
            this.destinationRoot(answers.name); 
            this.fs.copyTpl( this.templatePath('index.html'), 
            this.destinationPath(answers.name + '.html'), 
            { message: 'Hello world!' } );
            // Create extra directories 
            config.dirsToCreate.forEach(item => { mkdirp(item); });
            if (this.includeModernizr) {
                copy('modernizr.json', 'modernizr.json');
            }
            const templateData = {};
            const copyTpl = (input, output, data) => {
                this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), data);
            }
            let cssFile = `main.${this.includeSass ? 'scss' : 'css'}`;
            copyTpl(cssFile, `app/styles/${cssFile}`, templateData);
        });
    }
};