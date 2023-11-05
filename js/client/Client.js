

export function createClient (clientData) {
    return {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      company: clientData.company,
    }
}


