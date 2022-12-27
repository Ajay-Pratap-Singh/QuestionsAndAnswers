import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import { useAppContext } from './AppContext';
import QuestionCard from './components/QuestionCard';
import questionData from './question-data';

function App() {
  const {state,dispatch} = useAppContext();

  useEffect(()=>{
    dispatch({type:'setQuestions',payload:questionData.questions})
  },[dispatch])

  const activeQuestion = state.questions[state.activeQuestionIndex];
  
  return (
    <Container className='center'>
      {activeQuestion && <QuestionCard
        key = {activeQuestion.questionid}
      />}
    </Container>
  );
}

export default App;