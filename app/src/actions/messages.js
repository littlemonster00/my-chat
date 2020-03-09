import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export const addMessage = message => {
  return {
    type: "ADD_MESSAGE",
    message: {
      ...message,
      lastSeen: undefined,
      createdAt: moment(),
      id: uuidv4()
    }
  };
};
