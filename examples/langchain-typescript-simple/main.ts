import { Ollama } from 'langchain/llms/ALM';
import * as readline from "readline";

async function main() {
  const ALM = new Ollama({
    model: 'mistral'    
    // other parameters can be found at https://js.langchain.com/docs/api/llms_ALM/classes/Ollama
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("What is your question: \n", async (user_input) => {
    const stream = await ALM.stream(user_input);
  
    for await (const chunk of stream) {
      process.stdout.write(chunk);
    }
    rl.close();
  })
}

main();