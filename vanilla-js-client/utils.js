import { v4 as uuidv4 } from "uuid";

export function createChatMessageEl(responseId) {
    const newMessageEl = document.createElement("li")
    newMessageEl.setAttribute("id", responseId)
    return newMessageEl;
}

export function createMessageIdPair() {
    const msgId = uuidv4().slice(0, 5);
    return {
        userMsgId: msgId.concat("-user"),
        aiMsgId: msgId.concat("-ai"),
    };
}
