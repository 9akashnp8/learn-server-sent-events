import { createContext, useReducer } from "react";
import { messageReducer, MessageActions } from "./reducers";

type MessageHistory = {
    user: "user" | "system",
    content: string
}

type FCWithChildren = {
    children: React.ReactNode
}

type InitialStateType = {
    messages: MessageHistory[] | []
}

const initialState = {
    messages: []
}

const AppContext = createContext<{
    state: InitialStateType,
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null
});

function appReducer({ messages }: InitialStateType, action: MessageActions) {
    return ({
        messages: messageReducer(messages, action)
    })
}

function AppProvider({ children }: FCWithChildren) {
    const [ state, dispatch ] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }

