const secrets = require('./secrets')
const fetch = require('node-fetch')

const API_URI = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B'

function query(req){
    fetch(API_URI,{
        method: 'post',
        headers: {"Authorization": `Bearer ${secrets.token}`},
        body: JSON.stringify(req),
    })
    .then(res => res.json())
    .then(json => console.log(' RES \n', json))
    .catch( err => console.log(' ERROR : ', err))
     
}   

console.log(secrets)

query('The day the music died')

