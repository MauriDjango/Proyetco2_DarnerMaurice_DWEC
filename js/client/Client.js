/**
 * Creates a new client object based on the provided clientData.
 * @param {Object} clientData - The data to create the client object.
 * @returns {Object} - A client object with properties: name, email, phone, and company.
 */
export function createClient(clientData) {
  return {
    name: clientData.name,
    email: clientData.email,
    phone: clientData.phone,
    company: clientData.company,
  };
}
