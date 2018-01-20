// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const shell = require('electron').shell
//
// const os = require('os')
//
// const fileManagerBtn = document.getElementById('open-file-manager')
//
// fileManagerBtn.addEventListener('click', function (event) {
//   shell.showItemInFolder(os.homedir())
//   //shell.openExternal('http://electron.atom.io')
// })


const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('save', function() {
  console.log('save file!!!');
  console.log(document.querySelector(".TextEditorTitle").value);
  console.log( monaco.editor.getModels()[0].getValue());
});


ipcRenderer.on('new-project', function() {
    console.log('New Project');
  });

  ipcRenderer.on('new-notebook', function() {
    console.log('New Notebook');
  });

  ipcRenderer.on('new-todo', function() {
    console.log('New Todo');
  });

  ipcRenderer.on('new-goal', function() {
    console.log('New Goal');
  });




var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


// //need to learn how to do this for all icons
var nodes = document.querySelectorAll('.accordion');

nodes.forEach( n => {
  n.addEventListener("click", function(e){
    var icon = n.querySelector('.icon');
    icon.classList.toggle("open")
  })
});

// $(document).ready(function(){
//     $('#MyButton').click(function(){
//        console.log(editor.getValue());
//     });
//   });


  $(document).ready(function(){
    $('.left').click(function(){
        prompt('What is your name?', 'David')


    });
  });



