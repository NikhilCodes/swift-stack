const fs = require('fs')

export const saveStateFile = (data, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(null)
      }
    })
  })
}
