import { LLMModule, Message, SMOLLM2_1_135M } from "react-native-executorch";

async function TextFlagging(text: string): Promise<string> {
  console.log("Starting Text Flagging for text: ", text);
  const llm = new LLMModule({});

  try {
    console.log("Loading LLM model...");
    await llm.load(SMOLLM2_1_135M);

    const messages: Message[] = [
      {
        role: "system",
        content: "You are a assistant that protects user privacy. Identify and flag any sensitive information in" +
          " the provided text, such as names, addresses, phone numbers, email addresses, social security numbers" +
          ", credit card details, or any other personally identifiable information (PII). Return each of this" +
          " information in a new line if any such information is detected; otherwise, respond with" +
          " 'No sensitive information found'. Do not say anything else."
      },
      {
        role: "user",
        content: `Please analyze this text: "${text}"`
      }
    ];

    console.log("Generating response from LLM...");
    const response = await llm.generate(messages);
    console.log("LLM Response: ", response);
    llm.delete();

    return response;
  } catch (error) {
    llm.delete();
    throw error;
  }
}

export default TextFlagging;
