const {remote} = require('electron')
const {Menu,MenuItem} = remote
var util = require('util');
var NotesManager = require('../NotesManager');


let rightClickPosition = null
let element = null;
const menu = new Menu()
const fileActionsMenu = new Menu()


fileActionsMenu.append(new MenuItem(
  {
    label: 'Rename',
    click() {
      if($(element).hasClass("fileName")){
         console.log()
        NotesManager.rename(element);
      }
      else if($(element).hasClass("notebook"))
      {
        NotesManager.rename(element);
      }


      // NotesManager.deleteFolderRecursive(NotesManager.pathToNotesFolder() + clickedElement)
    }
  }
))

var deleteItem = new MenuItem(
  {
    label: 'Delete',
    click() {
      if ($(element).hasClass("fileName")){
        NotesManager.deleteNote($(element).text())
      }
      else if($(element).hasClass("notebook")){
        NotesManager.deleteFolderRecursive(NotesManager.pathToNotesFolder() + clickedElement)
      }
    }
  }
)

const menuItem = new MenuItem({
  label: 'Inspect Element',
  click() {
    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
  }

})
menu.append(menuItem)
fileActionsMenu.append(deleteItem)

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  element = $(e.target)
  clickedElement = $(e.target).text();

  if($(element).hasClass("fileName") || $(element).hasClass("notebook") ){
    
    fileActionsMenu.popup(remote.getCurrentWindow())
    
  }
  else{
    rightClickPosition = {
      x: e.x,
      y: e.y
    }
    menu.popup(remote.getCurrentWindow())
  }

  
}, false)



