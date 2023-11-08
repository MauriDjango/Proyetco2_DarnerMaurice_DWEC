

// Regular expressions for field validation
const nameRegex = /(\w+)\s+(\w+)\s+(\w+)/;
// This is a simplified email regex for the purposes of this project
const emailRegex = /\S+@\S+[.\S]+/;
const phoneRegex = /[0-9]{9}/;
const companyRegex = /[\w\s]+/;

/**
 * Utility class for validating client data.
 */
export class ValidateClient {
  /**
   * Validates a client name.
   * @param {string} name - The name to validate.
   * @returns {boolean} - True if the name is valid, false otherwise.
   */
  static validName(name) {
    return nameRegex.test(name);
  }

  /**
   * Validates an email address.
   * @param {string} email - The email to validate.
   * @returns {boolean} - True if the email is valid, false otherwise.
   */
  static validEmail(email) {
    return emailRegex.test(email);
  }

  /**
   * Validates a phone number.
   * @param {string} phone - The phone number to validate.
   * @returns {boolean} - True if the phone number is valid, false otherwise.
   */
  static validPhone(phone) {
    return phoneRegex.test(phone);
  }

  /**
   * Validates a company name.
   * @param {string} company - The company name to validate.
   * @returns {boolean} - True if the company name is valid, false otherwise.
   */
  static validCompany(company) {
    return companyRegex.test(company);
  }

  /**
   * Validates all client data fields.
   * @param {string} name - The client's name.
   * @param {string} email - The client's email.
   * @param {string} phone - The client's phone number.
   * @param {string} company - The client's company name.
   * @returns {boolean} - True if all fields are valid, false otherwise.
   */
  static validAll(name, email, phone, company) {
    return (
      ValidateClient.validName(name) &&
      ValidateClient.validEmail(email) &&
      ValidateClient.validPhone(phone) &&
      ValidateClient.validCompany(company)
    );
  }
}

// Example constant
export const yourMom = "Tu madre";
