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
})

// 3. The model doesn't read the file. It just says which tool to call, as JSON.
console.log(JSON.stringify(response.choices[0].message.tool_calls, null, 2))
