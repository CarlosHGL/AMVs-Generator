import { populateSelect, selectionController, addDataFromPopupForm, checkboxEvents, APIrequest, GenerateRoute, checkBoxController, populateCheckbox } from './functions.js'

document.addEventListener("DOMContentLoaded", function() {
  const startSelect = document.querySelector('.select-current-position')
  const endSelect = document.querySelector('.select-end-position')

  const pointList = [
    "AMV-RUMO", "AMV-CIAS", "AMV-TECIAP", 
    "AMV-LIQUIDOS", "AMV-FORMAÇÃO", "AMV-BRADO", 
    "AMV-BRADO-L1", "AMV-BRADO-L2", "AMV-BRADO-CIAS", 
    "AMV-FINAL-BRADO", "AMV-FINAL-FORMAÇÃO", "AMV-FINAL-LIQUIDOS", 
    "AMV-FORM-T-p-RUMO", "AMV-FORM-R-p-LIQUIDOS", "BRADO-L1", 
    "BRADO-L2", "TECIAP", "RUMO", "CIAS"]

  populateSelect(pointList, "select-current-position", "select-end-position")
  checkBoxController("checkable-item")
  // populateCheckbox(pointList)
  selectionController(startSelect, endSelect)
  addDataFromPopupForm("add-aux", "conteiner-pop-up-add-aux", "add-aux-bt-2", "exit-x-button", "inputNameAuxiliar", "inputCsAuxiliar", "conteiner-aux-name", "conteiner-aux-cs", "label-lateral")
  GenerateRoute()
  document.addEventListener("change", function() {
	selectionController(startSelect, endSelect)
  })
})