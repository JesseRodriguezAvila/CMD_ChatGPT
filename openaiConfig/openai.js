/*
    https://platform.openai.com/docs/introduction
    https://platform.openai.com/docs/overview

    *** Retrieve an api: https://platform.openai.com/api-keys ***
*/ 

if (!process.env.OPENAI_API_KEY) throw new Error("MISSING OPENAI API KEY in ENV");

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = openai;