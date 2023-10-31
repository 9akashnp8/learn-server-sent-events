
export function createChatMessageEl(responseId) {
    const newMessageEl = document.createElement("li")
    newMessageEl.setAttribute("id", responseId)
    return newMessageEl;
}
