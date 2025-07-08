import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

/**
 * Calls an LLM and returns a (very) simple itinerary object.
 * Swap the prompt/schema with your own when you need richer output.
 */
export async function generateTripWithAI(destination: string, days: number) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system:
      "You are an expert travel planner. Reply ONLY with a JSON array of days. Each day has a 'title' and 'activities' array.",
    prompt: `Create a ${days}-day trip plan for ${destination}.`,
  })

  // Best-effort JSON parse; fall back to raw text if parsing fails.
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
