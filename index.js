// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

const license = ['Apache License 2.0', 'MIT License'];
const Apache = `[![Apache License v2.0](https://img.shields.io/badge/-Apache%20License%20v2.0-orange)](http://www.apache.org/licenses/LICENSE-2.0)`
const MIT = `[![MIT License](https://img.shields.io/badge/-MIT%20License-brightgreen)](http://www.mit.edu/~amini/LICENSE.md)`

const noticeApache = `Apache License 

The Apache License Version 2.0 is a license that governs the use, reproduction, and distribution of software. The license grants the user a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute the work and such derivative works in source or object form. Additionally, each contributor grants to the user a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in the license) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the work, where such license applies only to those patent claims licensable by such contributor that are necessarily infringed by their contribution(s) alone or by combination of their contribution(s) with the work to which such contribution(s) was submitted.
Users may reproduce and distribute copies of the work or derivative works thereof in any medium, with or without modifications, and in source or object form, provided that the following conditions are met: (1) any other recipients of the work or derivative works are given a copy of the license, (2) any modified files carry prominent notices stating that they were changed, (3) all copyright, patent, trademark, and attribution notices are retained in the source form of any derivative works that are distributed, excluding those notices that do not pertain to any part of the derivative works, and (4) if the work includes a "NOTICE" text file as part of its distribution, any derivative works that are distributed must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the derivative works, in at least one of the following places:
within a NOTICE text file distributed as part of the derivative works, within the source form or documentation if provided along with the derivative works, or within a display generated by the derivative works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the license. Users may add their own attribution notices within derivative works that they distribute, alongside or as an addendum to the NOTICE text from the work, provided that the additional attribution notices are clearly marked as such and do not imply a direct or indirect endorsement by the licensor of the derivative works.`;

const noticeMIT = `MIT License

Copyright (c) 2013 Mark Otto.
Copyright (c) 2017 Andrew Fong.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;




// TODO: Create an array of questions for user input
const question = ['Tittle of project','Description of project', 'Process of installation of project', 'Usage of project',
'What is your Git Hub username?', 'Email address for contact', 'Contribution', 'Information of test'];

let response = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    //fs write file function

    let selectedLicense = '';
    let selectedNotice = ``;
    for (let i = 0; i < data.length; i++) {

        let firstWord;
        firstWord = data.license[i].split(' ')[0];

        if (firstWord === 'Apache') {
            selectedLicense = selectedLicense + Apache;
            selectedNotice = `${selectedNotice}
            
            ${noticeApache}`;

        }
        if (firstWord === 'MIT') {
            selectedLicense = selectedLicense + MIT;
            selectedNotice = `${selectedNotice}

            ${noticeMIT}`;
        
        }
    }

    const completedReadme = `
    
    # ${data.title}
    ${selectedLicense}

    ## Description

    ${data.description}

    ## Table of Contents

    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [Tests](#tests)
    * [Questions](#questions)
    * [License](#license)

    ## Installation
    ${data.installation}
    
    ![alt text](./assests/screen1.png)

    ## Usage

    ${data.usage}

    ![alt text](./assests/screen2.png)
    
    Link of video demonstrating functionality
    
    ### Credits
    - Node.js
    - Inquirer package

    ### Contributing
    ${data.contributing}

    ### Tests
    ${data.testsInstructions}

    # License
    ${selectedNotice}
    
    `

    fs.writeFile(fileName, completedReadme, function (err, data) {
        if (err){
            console.log(err);
            return;
        } else {
            console.log(data);
        }
    })
};

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt([

        {
            type: 'input',
            message: question[0],
            name: 'title'
        },
        {
                type: 'input',
                message: question[1],
                name: 'description'
        },
        {
                type: 'input',
                message: question[2],
                name: 'installation'
        },
        {
                type: 'input',
                message: question[3],
                name: 'usage'
        },
        {
                type: 'input',
                message: question[4],
                name: 'github'
        },
        {
                type: 'input',
                message: question[5],
                name: 'email'
        },
        {
                type: 'input',
                message: question[6],
                name: 'contributing'
        },
        {
                type: 'input',
                message: question[7],
                name: 'testInstructions'
        },
        {
                type: 'checkbox',
                message: 'Select License',
                name: 'license',
                choices: license,          
        }

    ])
    .then ((data) => {
        const fileName = 'README-Generated.md';
        writeToFile(fileName, data);
    })

}

// Function call to initialize app
init();
