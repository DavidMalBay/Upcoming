// var fs = require('fs');
// var rootDir = './Files/'

// var setupDirectories = ["Projects","Notebooks", "Habit Tracker", "Todos", "Goals" ]

// if (!fs.existsSync(rootDir)){
//     fs.mkdirSync(rootDir);
// }

// setupDirectories.forEach(subfolder => {
//     if (!fs.existsSync(rootDir + subfolder)){
//         fs.mkdirSync(rootDir + subfolder);
//     }
//   });


// // fs.writeFile("", "Hey there!", function(err) {
// //     if(err) {
// //         return console.log(err);
// //     }

// //     console.log("The file was saved!");
// // }); 

// const testFolder = './Files/Projects';

// fs.readdir(testFolder, (err, files) => {
//     for (var i=0, len = files.length; i < len; i++ ) {
//         file = files[i].substring(0, files[i].indexOf('.'));
//         console.log(file);
//         console.log(i)
//         if(!document.getElementById('NotebookFolder') + indexOf(file))
//         {
//             var ele = document.createElement("p");
//             ele.setAttribute("id","NotebookFolder"+ indexOf(file));
//             ele.innerHTML= file;
//             notebooks.appendChild(ele);
            
//         }
//     }
//     console.log(files.length)

// })


const testFolder = './Files/Notebooks/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})