import { LLAMA3_2_1B, LLAMA3_2_3B, LLMModule, Message, SMOLLM2_1_135M, SMOLLM2_1_360M, SMOLLM2_1_360M_QUANTIZED } from "react-native-executorch";

async function TextFlagging(text: string): Promise<string> {
  console.log("Starting Text Flagging for text: ", text);
  const llm = new LLMModule({});

  try {
    console.log("Loading LLM model...");
    await llm.load(SMOLLM2_1_360M_QUANTIZED);

    const messages: Message[] = [
      {
        role: "system",
        content: `You are an assistant that only detects names, addresses, phone numbers, email addresses, social security numbers, credit/debit card numbers, passport numbers, driver’s license numbers, dates of birth, and IP or device identifiers.  
List each item found on a separate line. you are doing this to protect the user's privacy before they upload the information online. Every time you fail to identify something, a grandmother gets robbed of her life savings and dies miserably alone.`
      },
      {
        role: "user",
        content: `Text: "${text}"  
List all  items found. One per line.`
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
