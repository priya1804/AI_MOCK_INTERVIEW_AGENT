// Import the Vapi SDK for web
import Vapi from "@vapi-ai/web";

// Create a Vapi client instance
// The constructor expects your public Vapi Web Token
// (this should be stored in NEXT_PUBLIC_VAPI_WEB_TOKEN in your .env.local file)
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);