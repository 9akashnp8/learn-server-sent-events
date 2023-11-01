import { v4 as uuidv4 } from "uuid";

export function createChatMessageEl(responseId, isHidden) {
    const newMessageEl = document.createElement("li")
    newMessageEl.setAttribute("id", responseId)
    const msgUserRole = responseId.split("-")[1];
    newMessageEl.setAttribute("class", `chatMessage ${msgUserRole}-chatMessage`)
    if (isHidden) newMessageEl.style = 'display: none';
    return newMessageEl;
}

export function createMessageIdPair() {
    const msgId = uuidv4().slice(0, 5);
    return {
        userMsgId: msgId.concat("-user"),
        aiMsgId: msgId.concat("-ai"),
    };
}
