require('dotenv').config();
const colors = require('./colorsConfig/colors.js');
const readline = require('readline-sync');

/* Require our OpenAI instance */
const openai = require('./openaiConfig/openai.js');

// WELCOM MESSAGE
console.log(colors.bold.green(`Welcome to gpt-3.5-turbo in Terminal!\n`));

// FETCH OPENAI DATA
/*
    In order to ask questions based on previous question/answers, we need to store a conversation history
    [
        { role: "user", content: "What is the capitol of california?" },
        { role: "assistant", content: "The capitol of California is Sacramento." }
        { role: "user", content: "What is the population?" },
        { role: "assistant", content: "According to the latest estimates, the population of Mexico City is approximately 9 million people." }
    ]
*/  
const chatHistory = [];
const askQuestion = async (question = "", model = "gpt-3.5-turbo") => {
    // FIX: SIMPLE VALIDATION
    if (question === "") return "Message cannot be empty, try again".warning;
    try {
        console.log(`fetching answer...`.waiting);

        const message = { role: "user", content: question };
        const completion = await openai.chat.completions.create({
            model, 
            messages: [...chatHistory, message]
        }); 
        /* { role: "assistant", content: "The capitol of California is Sacramento." } */
        const answer = completion.choices[0].message;

        // push user question and assistant answer to chatHistory
        chatHistory.push(message);
        chatHistory.push(answer);
        
        return `Assistant: ${answer.content}`.answer;
    } catch(err) { return "Assistant: I am unable to get an answer, try again".error }
};

/* MAIN */ 
(async () => {
    while(true) {
        const input = readline.question("Ask question: ".question);
        if (input === "exit") break;
        const answer = await askQuestion(input);
        console.log(answer);
    } 
    console.log(colors.bold.green("Goodbye!"));
})();