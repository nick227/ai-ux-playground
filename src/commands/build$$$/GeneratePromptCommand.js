import Command from "@interfaces/Command";
import buildPrompt from "@commands/build/buildPrompt";

export default class GeneratePromptCommand extends Command {
  async execute(req, template = null) {
    if (!req.query.prompt) {
      throw new Error('Missing required query parameters.');
    }
    const prompt = await buildPrompt(req, template);

    return prompt;
  }
}