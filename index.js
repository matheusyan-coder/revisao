//caregar o módulo express 
const { urlencoded } = require('express')
const express = require('express')

//carregar o módulo mongoose
const mongoose = require('mongoose')

//conectar com o banco de dados revisao 
const conexao = ()=>{
    mongoose.connect('mongodb+srv://userRevisao:thi020206@cluster0.s3hds.mongodb.net/revisao')
}
//conectar com a collection infos 
const modelo = new mongoose.Schema({
    nome:String,
    turma:String,
    disciplina:String
})
const infos = mongoose.model('infos', modelo)

//executar o módulo do express  
const app = express()

//definir o local padrão para os arquivos ejs
app.set('views','./')

//renderizar o arquivo index.ejs na requisição / (root)
app.get('/',async(req,res)=>{
    //conectar com o revisao 
    conexao()
    //buscar todos os dados de infos
    const resultado = await infos.find()
    res.render('index.ejs',{resultado})
})

//gravar as informações do formulário no banco de dados
app.use(urlencoded({extended:false}))

app.post('/',async(req,res)=>{
    const dados = req.body
    res.send(dados)
})

//ligar o servidor na porta 3050
app.listen(3050, ()=>{
    console.log('servidor local em http://localhost:3050')
})
