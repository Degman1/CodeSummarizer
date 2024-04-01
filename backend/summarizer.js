/**
 * Code to summarize portions of software using ChatGPT
 */

/**
 * Get summaries for a code snippet with corresponding style catagories
 * @param code_snippet String The code snippet to summarize
 * @param programming_language String The name of the programming language for the code snippet
 * @return JSON [{ text: String, catagory: String }]
 */
export function getSummaries() {
  return [
    {
      text: "Dummy Text",
      catagory: "Dummy Catagory"
    }, {
      text: "Dummy Text 2",
      catagory: "Dummy Catagory 2"
    }
  ];
}

// TODO Other functions to send new data to ChatGPT like ratings of responses
