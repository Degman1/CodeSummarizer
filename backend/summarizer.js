/**
 * Code to summarize portions of software using ChatGPT
 */


import { Anthropic } from '@anthropic-ai/sdk';

// Don't export this later
export const anthropic = new Anthropic();

class LLM {
  constructor() {
    this.model = null;
  }

  async prompt(text) {
    // Use the model to summarize the text
    return "Dummy Summary";
  }
}

class GPT3 extends LLM {
  constructor() {
    super();
    this.model = "GPT-3";
    throw new Error("GPT-3 is not implemented yet");
  }

  async prompt(text) {
    // Use GPT-3 to summarize the text
    return "GPT-3 Dummy Summary";
  }

}

class Haiku extends LLM {
  constructor() {
    super();
    this.model = "Haiku";
  }

  async prompt(text) {
    // Use Haiku to summarize the text
    try {
      var msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [{ role: "user", content: task + "\n" + text }],
      });
      return msg.data.messages[0].content;
    } catch (err) {
      console.error(err);
      return "Error: Could not reach Haiku";
    }
  }

}

// instantiate Haiku model
const haiku = new Haiku();

/**
 * Get summaries for a code snippet with corresponding style catagories
 * @param code_snippet String The code snippet to summarize
 * @param programming_language String The name of the programming language for the code snippet
 * @return JSON [{ text: String, catagory: String }]
 */
export function getSummaries(code_snippet, programming_language) {

  return [
    {
      text: haiku.prompt("Summarize the following code snippet\n" + code_snippet),
      category: "Brief Summary",
    },
    {
      text: haiku.prompt("Rate the following code snippet on a scale of 1 to 10\n" + code_snippet),
      category: "Rating",
    },
    {
      text: haiku.prompt("What are the main features of the following code snippet?\n" + code_snippet),
      category: "Features",
    }
  ];
}

// TODO Other functions to send new data to ChatGPT like ratings of responses
