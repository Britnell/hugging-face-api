
const express = require('express')
const fetch = require('node-fetch')
const secrets = require('./secrets')

const app = express()

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/index.html');
})
app.get('/gpt2', function (req, res) {
  res.sendFile(__dirname +'/gpt2.html');
})
app.get('/gptneo', function (req, res) {
    res.sendFile(__dirname +'/gptneo.html');
  })
app.get('/mask', function (req, res) {
  res.sendFile(__dirname +'/mask.html');
})

// #################


app.get('/query',(req,res)=>{
    console.log(' QUERY : \n',req.query )
    query(req.query)
        .then((data) =>{
            console.log(' GEN : ',data )
            res.send(JSON.stringify(data))
        })
})

app.get('/qgpt2',(req,res)=>{
    query_gpt2(req.query)
        .then((data) =>{
            console.log(' GEN : ',data )
            res.send(JSON.stringify(data))
        })
})

app.get('/qneo',(req,res)=>{
    // console.log(req)
    query_neo(req.query)
        .then((data) =>{
            console.log(' GENerated : ',data )
            res.send(JSON.stringify(data))
        })
})

app.get('/qmask',(req,res)=>{
    query(req.query)
        .then((data) =>{
            console.log(' GENerated : ',data )
            res.send(JSON.stringify(data))
        })
})

// #################


function query_neo(req){
    console.log(' GPT-Neo Query : ', req )
    req.max = parseInt(req.max)
    req.temp = parseFloat(req.temp)+0.0001
    console.log(' parsed : ', req )

    return fetch(req.model,{
        method: 'post',
        headers: {"Authorization": `Bearer ${secrets.token}`},
        body: JSON.stringify({
            inputs: req.query,
            parameters:{
                temperature: req.temp,
                max_new_tokens: req.max, 
                end_sequence: req.end, 
                return_full_text: false
            }
        }),
    })
    .then( (res)=>{
        return res.json() 
    })
    .catch( err => console.log(' ERROR : ', err))   
}

function query_gpt2(req){
    req.seqs = parseFloat(req.seqs)
    req.len = parseFloat(req.len)
    req.temp = parseFloat(req.temp)+0.0001
    console.log(' GPT-2 Query : ', req )
    return fetch(req.model,{
        method: 'post',
        headers: {"Authorization": `Bearer ${secrets.token}`},
        body: JSON.stringify({
            inputs: req.query,
            parameters:{
                temperature: req.temp,
                max_new_tokens: req.len, 
                num_return_sequences: req.seqs, 
                // return_full_text: false,
            }
        }),
    })
    .then( (res)=>{
        return res.json() 
    })
    .catch( err => console.log(' ERROR : ', err))   
}

function query(req){
    return fetch(req.model,{
        method: 'post',
        headers: {"Authorization": `Bearer ${secrets.token}`},
        body: JSON.stringify({
            inputs: req.query,
            parameters:{
                // temperature: 1.0, // def 1.0
                max_new_tokens: 250, // 0 -256
                num_return_sequences: 5, 
                // return_full_text: false,
            }
        }),
    })
    .then( (res)=>{
        return res.json() 
    })
    .catch( err => console.log(' ERROR : ', err))     
}   

const port = 3000
app.listen(port, function () {
  console.log(`Express runnign on http://localhost:${port} `);
});