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
const fs = require('fs')
const generatePage = require('./src/page-template')

const profileDataArgs = process.argv.slice(2, process.argv.length); //sets array to take command line argument inputs. slice rids of `node` and `app.js` to start array at index 2 and takes on rest of length

const [name, github] = profileDataArgs;



fs.writeFile('index.html', generatePage(name, github), err => {
  if(err) throw new Error (err);

  console.log('Portfolio complete! Check out index.html to see output!');
});