var fs = require('fs');

module.exports = {

    deleteFolderRecursive: function(path) {
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
          var curPath = path + "/" + file;
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
        module.exports.renderFolders();
      }
    },
  
    pathToHomeFolder: function() {
      return __dirname
    },
  
    pathToNotesFolder: function() {
      return  __dirname +  "\\Files\\Notebooks\\";    
    },
  
    renderFolders: function () {
      var notebooks = document.querySelector('.Notebooks');

      fs.readdir(__dirname +  "\\Files\\Notebooks\\", (err, files) => {
    
        // you shouldn't ignore errors
        if (err) return console.log(err);
    
        // re-use the same element's structure
        let p = document.createElement("p");
        p.classList.add("notebook")
    
        notebooks.innerHTML = result = files.reduce((r, c) => {
          p.innerHTML = c
          return r + p.outerHTML
        }, "")
    
        $(".notebook").on("click", function (e) {
          $(this).addClass('activeNotebook').siblings().removeClass('activeNotebook');
          $(".accordion").addClass('active').siblings().removeClass('active');

          $(".CurrentNotebookName").text($(this).text());
        });

       
          
      });


      


    },
    rename: function (element) {
        let renamed = false
        let currentName = $(element).text() + "\\";
        console.log(currentName)
        $(element).click();
      setTimeout(function() {
        $(element).trigger('focus');
      }, 0);
        element.attr("contenteditable", "true")
        element.keypress(function (evt) {

            var keycode = evt.charCode || evt.keyCode;
            if (keycode  == 13 && renamed == false) { //Enter key's keycode
                fs.renameSync(module.exports.pathToNotesFolder() + currentName, module.exports.pathToNotesFolder() + $(element).text() + "\\")
                renamed = true;
                window.getSelection().removeAllRanges();
                element.attr("contenteditable", "false")
                return false;
            }
            else if (keycode  == 13 ){
                window.getSelection().removeAllRanges();
                element.attr("contenteditable", "false")
                return false;

            }

          });

          
          setTimeout(function() {
            $(element).trigger('focus');
          }, 0)


        

      },
      loadNote: function(fileName){

      }
  }
  