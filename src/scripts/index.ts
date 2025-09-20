//IMPORTS 
// Import necessary classes and enums from Google Generative AI SDK
import {
  GoogleGenerativeAI, // Main class to interact with Gemini AI
  HarmCategory,       // Enum to specify types of harmful content
  HarmBlockThreshold, // Enum to specify threshold for blocking content
} from "@google/generative-ai";

// CONFIGURATION 

// API key from environment variables (required for authentication)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Load a specific Gemini generative AI model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Selected model version
});

//  GENERATION SETTINGS 
// Controls the AI output behavior
const generationConfig = {
  temperature: 1,           // Creativity/randomness of the output (0–2)
  topP: 0.95,               // Nucleus sampling probability
  topK: 40,                 // Limits selection to top-K probable tokens
  maxOutputTokens: 8192,    // Maximum length of output
  responseMimeType: "text/plain", // Output format
};

// Prevents harmful or unsafe outputs
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// ---------------------------- CHAT SESSION ----------------------------
// Start a reusable chat session with the model, using the above configurations
export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
});
