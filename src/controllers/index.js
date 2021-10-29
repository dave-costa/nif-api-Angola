const starter = require("../utils/getData")

const resolver = {
  Query: {
    async consultNIF(_, { documentNumber }) {
      const param = String(documentNumber)
      const data = await starter(param)
      return {
        documentNumber: data.documentNumber,
        documentFullName: data.documentFullName,
        documentState: data.documentState,
        documentType: data.documentType,
      }
    },
  },
}

module.exports = resolver
