import { populateSelect, selectionController, addDataFromPopupForm, checkboxEvents, APIrequest, GenerateRoute, checkBoxController, populateCheckbox, alternateStates, observerStates } from './functions.js'

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
  selectionController(startSelect, endSelect)
  GenerateRoute()
  alternateStates()
  observerStates()
  document.addEventListener("change", function() {
  selectionController(startSelect, endSelect)
  })
})