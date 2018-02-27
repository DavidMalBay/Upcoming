const {remote} = require('electron')
const {Menu,MenuItem} = remote
var util = require('util');
var NotesManager = require('../NotesManager');


let rightClickPosition = null
let element = null;
const menu = new Menu()
menu.append(new MenuItem(
  {
    label: 'Delete',
    click() {
      console.log(NotesManager.pathToNotesFolder() + clickedElement)
      if ($(element).hasClass("fileName")){
        NotesManager.deleteNote($(element).text())
      }
      else if($(element).hasClass("notebook")){
        NotesManager.deleteFolderRecursive(NotesManager.pathToNotesFolder() + clickedElement)
      }
    }
  }
))

menu.append(new MenuItem(
  {
    label: 'Rename',
    click() {
      console.log("Rename")
      // $(element).trigger("focus");
      NotesManager.rename(element);

      // NotesManager.deleteFolderRecursive(NotesManager.pathToNotesFolder() + clickedElement)
    }
  }
))

const menuItem = new MenuItem({
  label: 'Inspect Element',
  click() {
    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
  }

})
menu.append(menuItem)

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  element = $(e.target)
  clickedElement = $(e.target).text();
  rightClickPosition = {
    x: e.x,
    y: e.y
  }
  menu.popup(remote.getCurrentWindow())
}, false)



