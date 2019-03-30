const fs = require('fs')
const contentFilePath = './content.json'

function save(content){
    const contentJson = JSON.stringify(content)
    return fs.writeFileSync(contentFilePath, contentJson)
}
function load(){
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}

//Obs: Não foi usado require('./content.json') porque o node o manteria carregado durante todo o tempo de execução sem necessidade

module.exports = {
    save,
    load
}