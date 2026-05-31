import OpenAI from "openai"

const openai = new OpenAI() // reads OPENAI_API_KEY from the environment

// 1. Describe a tool to the model. Just a name, a description, and a JSON schema.
const tools = [
  {
    type: "function" as const,
    function: {
      name: "read_file",
      description: "Read the contents of a file from disk",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path to the file" },
        },
        required: ["path"],
      },
    },
  },
]

// 2. Ask a question that the model can only answer by using the tool.
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "What's in package.json?" }],
  tools,
  tool_choice: "auto", // make it call a tool instead of answering in prose
})

// 3. The model doesn't read the file. It just says which tool to call, as JSON.
const message = response.choices[0].message
console.log(JSON.stringify(message.tool_calls ?? message.content, null, 2))
