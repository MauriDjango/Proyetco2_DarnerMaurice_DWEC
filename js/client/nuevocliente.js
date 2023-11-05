import { ValidateClient } from './ValidateClient.js'

const submitButton = document.getElementById("submitButton")
const name = document.getElementById("nombre")
const email = document.getElementById("email")
const phone = document.getElementById("telefono")
const company = document.getElementById("empresa")
const form = {
  nameValid: false,
  emailValid: false,
  phoneValid: false,
  companyValid: false,
  valid: false
}

name.addEventListener("blur", function (e) {
  formBlurHandler(form, e.target)
})
email.addEventListener("blur", function (e) {
  formBlurHandler(form, e.target)
})
phone.addEventListener("blur", function (e) {
  formBlurHandler(form, e.target)
})
company.addEventListener("blur", function (e) {
  formBlurHandler(form, e.target)
})
submitButton.addEventListener("click", function (e) {
  submitForm(e.target.parentElement)
})

function formBlurHandler(form, target) {
  console.log("Blur handler target passed", target)
  const fieldValue = target.value
  console.log("Field value passed", fieldValue)

  switch (target.id) {
    case "nombre": {
      form.nameValid = ValidateClient.validName(fieldValue)
      if (!form.nameValid) { alertForm(target) } else { removeAlert(target) }
      break
    }
    case "email": {
      form.emailValid = ValidateClient.validEmail(fieldValue)
      if (!form.emailValid) { alertForm(target) } else { removeAlert(target) }
      break
    }
    case "telefono": {
      form.phoneValid = ValidateClient.validPhone(fieldValue)
      if (!form.phoneValid) { alertForm(target) } else { removeAlert(target) }
      break
    }
    case "empresa": {
      form.companyValid = ValidateClient.validCompany(fieldValue)
      if (!form.companyValid) { alertForm(target) } else { removeAlert(target) }
      break
    }
  }
  validForm(form)
  console.log(form)
  console.log()
  toggleSubmit(form, submitButton)
}

function alertForm(form) {
  const alert = document.getElementById(`${form.id}.alert`)
  if (alert !== null) {
    alert.remove()
  }
  let fieldAlert = document.createElement("P")

  fieldAlert.innerText = `The ${form.id} you provided is invalid`
  fieldAlert.classList.add('bg-red-600', 'text-xs', 'text-white', 'p-2', 'text-center')
  fieldAlert.setAttribute("id", `${form.id}.alert`)
  form.parentElement.appendChild(fieldAlert)
}

function removeAlert(form) {
  const alert = document.getElementById(`${form.id}.alert`)
  if (alert !== null) {
  alert.remove()
  }
}

function validForm(form) {
  form.valid = form.nameValid &&
    form.companyValid &&
    form.emailValid &&
    form.companyValid
}

function resetForm(form) {
  form = {
    nameValid: false,
    emailValid: false,
    phoneValid: false,
    companyValid: false,
    valid: false
  }
}

function toggleSubmit(form, submit) {
  if (form.valid) {
    submit.removeAttribute( "disabled" )
    submit.setAttribute( "class", "bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold")
  } else {
    submit.setAttribute("disabled")
    submit.setAttribute("class", "bg-grey-600 hover:bg-grey-900 w-full mt-5 p-2 text-white uppercase font-bold")
  }
}


