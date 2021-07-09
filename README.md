# hugging-face-api

Just a simple test implementation for the huggingface-API

This is a first starting point to try the web API for those (like I) who want to just play around a little and see how it responds to what. 
The API btw are really great - nice & simple. 

Register with huggingface and find the API token in your profile.
Check your usage in the [Dashboard](https://api-inference.huggingface.co/dashboard/) 

Add the token to the code replacing `secrets.token`, or like I did add a `secrets.js` with `exports.token = '...' `

For other demos try out [Write with transformer](https://transformer.huggingface.co/doc/gpt2-large) 
I only just found this great guide on [GPT-Neo & API examples](https://huggingface.co/blog/few-shot-learning-gpt-neo-and-inference-api)
You can try out any other [model](https://huggingface.co/models) too in the little box on the model page.

# Reference 
See the [API Overview & Getting started](https://api-inference.huggingface.co/docs/python/html/quicktour.html) for documentation.

# Models
I haven't dived too deep yet, but to try out other models, find the models listed in the Reference above, or try out any other model with :
`https://api-inference.huggingface.co/models/MODEL_ID`
e.g. gpt2  https://huggingface.co/gpt2 - has id `gpt2`
gpt-neo  https://huggingface.co/EleutherAI/gpt-neo-2.7B - has id `EleutherAI/gpt-neo-2.7B`
etc.

# test.js
makes calls to the API directly from node.js

# server
run `index.js` and go to `localhost:3000` for a web interface which lets you change parameters on the fly and easily run some queries to try out the API and their responses.

The responses do take a little while, if you're not sure what's going on, keep an eye on the node and browser console for messages.