import { v4 as uuidv4 } from 'uuid'

export class Client {
  _info = null

  constructor (newName, newEmail, newPhone, newCompany) {
    this._info =
      {
      name: newName,
      email: newEmail,
      phone: newPhone,
      company: newCompany,
      id : uuidv4()
    }
  }

  setName (newName) { this._info.name = newName }

  getName () { return this._info.name }

  setEmail (newEmail) { this._info.email = newEmail }

  getEmail () { return this._info.email }

  setNumber (newNumber) { this._info.phone = newNumber }

  getNumber () { return this._info.phone }

  setCompany (newCompany) { this._info.company = newCompany }

  getCompany () { return this._info.company }
}

function createClient (name, email, phone, company) {
  if (ValidateClient.validAll(name, email, phone, company)) {
    return new Client(name, email, phone, company)
  } else return null
}