import sendSocketMsgToClient from '../sendSocketMsgToClient.js';
import { TemplatePromptCommand, DefaultPromptCommand, ImagePromptCommand } from '../commands/prompt/index.js';
import { promptTemplateList } from '../constants.js';

const chatGptControllers = async (req, res) => {
  const type = typeof req.params?.type === 'string' ? req.params.type : null;
  try {
    console.log('type:', type);
    switch (true) {
      //image route
      case type === "image":
        console.log("image route")
        const imagePromptCommand = new ImagePromptCommand(req, res);
        await imagePromptCommand.execute();
        break;
      //template route
      case promptTemplateList.includes(type):
        console.log("template route")
        const templatePromptCommand = new TemplatePromptCommand(req, res);
        await templatePromptCommand.execute();
        break;
      //default route
      default:
        console.log("default route")
        const defaultPromptCommand = new DefaultPromptCommand(req, res);
        await defaultPromptCommand.execute();
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default chatGptControllers;
