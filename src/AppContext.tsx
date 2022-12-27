import React, { createContext, useContext, useReducer } from "react";

type AnswerPayload = {
  questionId: number,
  response: any
}
type Action = {
  type: 'changeAnswer',
  payload: AnswerPayload
} | {
  type: 'changeQuestion',
  payload: number
} | {
  type: 'setQuestions',
  payload: any[]
}
type Dispatch = (action: Action) => void
type Data = {
  questions: any[],
  responses: any,
  activeQuestionIndex: number
}
type ContextProviderProps = {children: React.ReactNode}

const AppStateContext = createContext<{state: Data; dispatch: Dispatch} | undefined>(undefined);

function appReducer(state: Data, action: Action) {
    switch (action.type) {
      case 'changeAnswer': {
        const newResponses = {...state.responses};
        newResponses[action.payload.questionId] = action.payload.response;
        return {...state,responses: newResponses}
      }
      case 'changeQuestion': {
        return {...state, activeQuestionIndex: action.payload}
      }
      case 'setQuestions': {
        console.log(action.payload);
        
        return { questions: action.payload, responses:{},activeQuestionIndex: 0}
      }
    }
}
function ContextProvider({children}: ContextProviderProps) {
  const initState = {questions:[],responses:{},activeQuestionIndex:0}
  const [state, dispatch] = useReducer(appReducer, initState)
  const value = {state, dispatch}
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

function useAppContext() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a ContextProvider')
  }
  return context
}

export {ContextProvider, useAppContext}