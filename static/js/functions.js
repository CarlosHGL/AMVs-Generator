export function populateSelect(pointsList, startSelectSelector, endSelectSelector) {
  const startSelect = document.querySelector(`.${startSelectSelector}`)
  const endSelect = document.querySelector(`.${endSelectSelector}`)

  startSelect.innerHTML, endSelect.innerHTML = ''
  startSelect.options.add(new Option('Selecione o ponto de partida', ''))
  endSelect.options.add(new Option('Selecione o destino final', ''))

  pointsList.forEach(point => {
    const option = document.createElement("option")
    const option2 = document.createElement("option")

    option.value = point
    option.text = point
    option.class = "optionAMVRoute"

    option2.value = point
    option2.text = point
    option2.class = "optionAMVRoute"
    startSelect.appendChild(option)
    endSelect.appendChild(option2)
  })
}

export function populateCheckbox(routeList) {
  const checklist = document.querySelector('.check-list')
  checklist.innerHTML = ""
  routeList.forEach((route, index) => {
    const checkboxConteiner = document.createElement("div")
    const strokeMarker = document.createElement("div")
    const checkArea = document.createElement("div")
    const checkArrow = document.createElement("img")
    const checkboxText = document.createElement("p")

    checkboxConteiner.classList.add("checkable-item")
    strokeMarker.classList.add("checked-item-stroke")
    checkArea.classList.add("checkbox")
    checkArrow.classList.add("checked-icon")
    checkboxText.classList.add("text-element-for-check")

    checkArrow.src = "../static/img/check_marck_icon.svg"

    checkboxText.innerHTML = `${route}`

    checkboxConteiner.dataset.checked = false
    checkboxConteiner.dataset.activated = false
    checkboxConteiner.dataset.index = index


    checkArea.appendChild(checkArrow)
    checkboxConteiner.appendChild(strokeMarker)
    checkboxConteiner.appendChild(strokeMarker)
    checkboxConteiner.appendChild(checkArea)
    checkboxConteiner.appendChild(checkboxText)
    checklist.appendChild(checkboxConteiner)

  })
}

export function checkBoxController(checkboxAllClass) {

  const checkboxList = document.querySelectorAll(`.${checkboxAllClass}`)
}

export function selectionController(startSelectSelector, endSelectSelector) {
  if (startSelectSelector.value == 'Selecione o ponto de partida' || '') {
    endSelectSelector.disabled = true
    endSelectSelector.options[0].selected = true
  } else {
    endSelectSelector.disabled = false
  }

  for (var i = 0; i < endSelectSelector.options.length; i++) {
    if (endSelectSelector.options[i].value == startSelectSelector.value) {
      endSelectSelector.options[i].disabled = true
    } else {
       endSelectSelector.options[i].disabled = false
    }
  }
}

export function addDataFromPopupForm(initButton, popupTarget, addButton, exitButton, inputNameElement, inputCSElement, nameTargetSelector, csTargetSelector, hiddenElementTarget) {

  const popupForm = document.querySelector(`.${popupTarget}`)

  const initFormButton = document.querySelector(`#${initButton}`)
  const addDataButtonForm = document.querySelector(`#${addButton}`)
  const exitButtonForm = document.querySelector(`.${exitButton}`)

  const inputName = document.querySelector(`.${inputNameElement}`)
  const inputCS = document.querySelector(`.${inputCSElement}`)

  const nameTarget = document.querySelector(`.${nameTargetSelector}`)
  const csTarget = document.querySelector(`.${csTargetSelector}`)

  const hiddenElementsTarget = document.querySelectorAll(`.${hiddenElementTarget}`)

  initFormButton.addEventListener("click", function() {
    popupForm.style.display = "grid"
  })

  addDataButtonForm.addEventListener("click", function() {
    if (inputName.value != '' && inputCS.value != '') {
      hiddenElementsTarget.forEach(element => {
        if (element.getAttribute("hiddend") === "true") {
          element.style.display = "flex"
        }
      })

      nameTarget.innerHTML = inputName.value
      csTarget.innerHTML = inputCS.value

      inputName.value = ''
      inputCS.value = ''

      popupForm.style.display = "none"
    }
  })

  exitButtonForm.addEventListener("click", function() {
    popupForm.style.display = "none"
  })                                
}

export function checkboxEvents() {
  const checkBoxList = document.querySelector(".check-list")
  var checkboxes = checkBoxList.querySelectorAll('.checkable-item')

  checkboxes.forEach(checkbox => {
    const checkMarkIcon = checkbox.querySelector('.checked-icon')
    const checkedItemStroke = checkbox.querySelector(".checked-item-stroke")
    const textElementForCheck = checkbox.querySelector(".text-element-for-check")
    const check = checkbox.querySelector(".checkbox")
    var checkboxAtt = checkbox.getAttribute("checked")

    checkbox.addEventListener('click', function() {
      checkbox.checked === false ? (
        checkbox.checked = true,
        checkMarkIcon.style.display = "block",
        checkedItemStroke.style.display = "block",
        checkMarkIcon.style.opacity = "75%",
        checkedItemStroke.style.opacity = "75%",
        textElementForCheck.style.opacity = "75%",
        check.style.opacity = "75%"

      ) : (
        checkbox.checked = false,
        checkMarkIcon.style.display = "none",
        checkedItemStroke.style.display = "none",
        checkMarkIcon.style.opacity = "100%",
        checkedItemStroke.style.opacity = "100%",
        textElementForCheck.style.opacity = "100%",
        check.style.opacity = "100%"
      )
    })
  })
}

export function GenerateRoute() {
  const newRoute = document.getElementById('start-route')
  const startSelection = document.querySelector('.select-current-position')
  const endSelection = document.querySelector('.select-end-position')

  newRoute.addEventListener("click", (event) => {
    APIrequest(startSelection.value, endSelection.value)
  })
}

export function APIrequest(startPoint, endPoint) {
  fetch('/api/user/v2/generate-routes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startPoint: `${startPoint}`, endPoint: `${endPoint}` }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })

    .then(data => {
      routeSelect(data.dados)
    })
    .catch(error => console.error('Erro:', error))
}

export function routeSelect(routeList) {
  const amvNumber = {
    "BRADO-L1":1, 
    "BRADO-L2":2,
    "TECIAP":4, 
    "RUMO":7, 
    "CIAS":11,
    "AMV-RUMO":16, 
    "AMV-CIAS":22, 
    "AMV-TECIAP":29, 
    "AMV-LIQUIDOS":37, 
    "AMV-FORMAÇÃO":46,
    "AMV-BRADO":56, 
    "AMV-BRADO-L1":67, 
    "AMV-BRADO-L2":79, 
    "AMV-BRADO-CIAS":92,
    "AMV-FINAL-BRADO":106, 
    "AMV-FINAL-FORMAÇÃO":121, 
    "AMV-FINAL-LIQUIDOS":137,
    "AMV-FORM-T-p-RUMO":154, 
    "AMV-FORM-R-p-LIQUIDOS":172 
  }

  const selectElement = document.querySelector(".select-choice-route")
  const map = document.querySelector("#Map")
  var numberList = []

  selectElement.innerHTML = ''
  selectElement.options.add(new Option('Selecione uma Rota', ''))

  routeList.forEach((route, index) => {
    const option = document.createElement("option")

    option.value = index
    option.text = `Rota ${index + 1}`
    option.class = "optionAMVRoute"

    selectElement.appendChild(option)
  })

  selectElement.addEventListener("change", (event) => {
    if (numberList.length > 0) {
      defaultPoints(numberList)
      console.log(numberList)
    }
    numberList = []
    if (selectElement.value !== '') {
      populateCheckbox(routeList[selectElement.value])
      checkboxEvents()

      routeList[selectElement.value].forEach( (value, index) => {

        if ((index) < routeList[selectElement.value].length) {
          var result = amvNumber[routeList[selectElement.value][index]] + amvNumber[routeList[selectElement.value][index + 1]]

          if (result) {
            console.log(result)
            var aresta = map.querySelector(`[data-numberId="${result}"]`)
            aresta.style.fill = "green"
            aresta.style.stroke = "3px solid green", "3px solid green"
            numberList.push(result)
          }

          console.log(`Fora da verificação: ${result}`)
          var vertice = map.querySelector(`.${value}`)
          vertice.style.fill = "green"
          vertice.style.stroke = "3px solid green", "3px solid green"
          numberList.push(vertice)
        }
      })
    }
  })
}

// export function authenticationControllerFunction(inputUser) {
  
//   return fetch('/api/user/v2/authenticate-user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ cs: `${inputUser}` }),
//   })
// }

export function alternateStates() {
  const elements = document.querySelectorAll(".alternateFlag")
  const sections =  Array.from(document.querySelectorAll("body > section"))

  const statesTypesObj = {
    // login: (element, inputUser="") => {
    //   const inputUserElement = document.querySelector(`.${inputUser}`)
    //   if (inputUser != "") {
    //     // console.log(inputUserElement.value)
    //     authenticationControllerFunction(inputUserElement.value)

    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Erro na requisição');
    //       }
    //       return response.json();
    //     })

    //     .then(data => {
    //       if (data.user.auth == true) {
    //         deafultAction(element)
    //         console.log('Usuário autenticado:', data.user)
    //       } else {
    //         console.log('Usuário não autenticado:', data.user)
    //       }
    //     })
    //     .catch(error => console.error('Erro:', error))}
    //   }
    // },
    deafultAction: (element) => {
      const att = element.getAttribute("data-from")
      var targetElement = document.querySelector(`#${att}`)
      let fhater = element.closest('section')

      if (window.getComputedStyle(targetElement).display === "none") {
        if (element.getAttribute("data-close") === "all") {
          sections.forEach(section => {
            section.style.display = "none"
          })
        }

        targetElement.style.display = `${targetElement.getAttribute("data-state")}`

        if(element.getAttribute("data-close") !== "false") {
          fhater.style.display = "none"
        }

      } else {
        targetElement.style.display = "none"
      }
    },
  }

  elements.forEach(element => {
    var inputTarget = "input-cs-machinist"
    element.addEventListener("touchstart", function() {statesTypesObj.deafultAction(element)})
    element.addEventListener("click", function() {statesTypesObj.deafultAction(element)})
  })
}

export function observerStates() {
  let fhater = document.querySelector('body')
  const header = document.querySelector(".conteiner-image-logo-rumo-log")
  const section = document.querySelector(".section-route-after-calc")

  let observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes') {
              if (mutation.attributeName === 'style') {
                if (window.getComputedStyle(section).display !== "none") {
                  header.querySelector(".icon-button").style.display = "flex"
                  header.style.justifyContent = "space-between"
                } else {
                  header.querySelector(".icon-button").style.display = "none"
                  header.style.justifyContent = "center"
                }
              }
          }
      })
  })

  observer.observe(fhater, { attributes: true, childList: true, subtree: true })
}

function defaultPoints(poinstList) {
  var fhater = document.querySelector("#Map")
  poinstList.forEach(value => {
    try {
      var point = value
      point.style.fill = "black"
      point.style.stroke = "0px solid black"
    } catch {
      var point = fhater.querySelector(`[data-numberId="${value}"]`)
      point.style.fill = "black"
      point.style.stroke = "0px solid black"
    }
  })
}