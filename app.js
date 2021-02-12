//////NOTES//////
// 'process' is global object like document or window
// 'argv'  is a property of process that contains an array that holds what is typed on the command line after executing the js file.
// the slice() method returns data based on the specified index where it slices. it returns all except the 0 in. to get the rest of the array use the length property instead specifying an index. ex: something.slice(2, array.length)
// arrays [] and objects set as constants can be edited because they are a refference to the container not the content. 
/*const profileDataArgs = process.argv.slice(2, process.argv.length);
//console.log(profileDataArgs);
const printProfileData = (profileDataArr) => {
    // This...
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }
    console.log('================');

    // Is the same as this...
    profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArgs);
*/




///////MAIN CODE//////
const inquirer = require("inquirer")
// const fs = require('fs')
// const generatePage = require('./src/page-template')

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//   if(err) throw err;

//   console.log('Portfolio complete! Check out index.html to see output!');
// });

// function that uses inquirer's prompt method
const promptUser = () => {
  // this is used as a promise
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username',
      validate: gitHubInput => {
        if (gitHubInput) {
          return true;
        } else {
          console.log('Please enter a GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {
        if (confirmAbout){
          return true;
        }else {
          return false;
        }
      }
    }
  ]);
};
// invoke the promptUser function to return inquirer.prompt method as promise. appernd the  .then() mothod to resolve promise by returning answers
//promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => { // use console logs to devide prompts

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  ============= 
  Add a New Project
  =============
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectName => {
        if (projectName) {
          return true;
        } else {
          console.log('Please provide name for your project!');
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Please provide a project description!');
          return false
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        } else {
          console.log('Please provide a GitHub link to your project!');
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })

};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });