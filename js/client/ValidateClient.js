const nameRegex = /(\w+)\s+(\w+)\s+(\w+)/
//This is a simplified email regex for the purposes of this project
const emailRegex = /\S+@\S+[.\S]+/
const phoneRegex = /[0-9]{9}/
const companyRegex = /[\w\s]+/

export class ValidateClient {
  static validName (name) { return nameRegex.test(name) }

  static validEmail (email) { return emailRegex.test(email) }

  static validPhone (phone) { return phoneRegex.test(phone) }

  static validCompany (company) { return companyRegex.test(company) }

  static validAll (name, email, phone, company) {
    return ValidateClient.validName(name) &&
      ValidateClient.validEmail(email) &&
      ValidateClient.validPhone(phone) &&
      ValidateClient.validCompany();
  }
}

export const yourMom = "Tu madre"