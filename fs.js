console.log("========== stat() ==========");
const fs = require('fs');
const filepath = 'output.txt';
fs.stat(filepath, (err,stats) =>{
    if (err) {
        console.error(err);
        return;
    }
    // Access the propertise of the stats object 
    console.log('File size:', stats.size + ' bytes');
    console.log('Is a file:', stats.isFile());
    console.log('Is a directory:',stats.isDirectory());
    console.log('File birthtime (creation time):',stats.birthtime);
    console.log('File Modification time:', stats.mtime);
})


 console.log("========== AppendFile() ==========");   
const filepath1 = "output.txt";
const dataToAppend = '\n This data will be appended to the file.';
// Appended data to the file asynchronously
fs.appendFile(filepath, dataToAppend, (err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data has been appended to the file.');
});



console.log("========== fs.unlink() ==========");
const filepath2 = 'sample.txt';
// Delete the file asynchronously
fs.unlink(filepath2, (err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been deleted.');

})