import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BiArrowBack } from 'react-icons/bi';
import { useAppContext } from '../AppContext';

const QuestionCard = () => {
    const {state,dispatch} = useAppContext();
    const {activeQuestionIndex,questions,responses} = state;
    const question = questions[activeQuestionIndex];

    const changeHandler = (questionId:number,response:string|any[]) => {
        dispatch({type:'changeAnswer',payload:{questionId,response}})
    }

    const checkboxChangeHandler = (questionId:number,response:string, toggleValue:boolean) => {
        let responseArray = responses[questionId] || [];
        console.log(toggleValue);
        
        if(toggleValue){
            responseArray = [...responseArray,response];
        }else{
            console.log(responseArray,responseArray.indexOf(response))
            responseArray.splice(responseArray.indexOf(response),1)
        }
        dispatch({type:'changeAnswer',payload:{questionId,response:responseArray}})
    }

    const goToPrevQuestion = () => {
        const {activeQuestionIndex} = state;
        if(activeQuestionIndex !== 0){
            dispatch({type:'changeQuestion',payload:activeQuestionIndex-1});
        }else{
            alert('You are on first Question');
        }
    }

    const goToNextQuestion = () => {
        if(activeQuestionIndex +1 !== questions.length){
            dispatch({type:'changeQuestion',payload:activeQuestionIndex+1});
        }else{
            alert('Submit');
        }
    }

    return (
        <Card style={{ width: '28rem' }}>
            <Card.Header>
                    {
                        <BiArrowBack
                            title='Previous Question'
                            style={{ 
                                cursor:'pointer'
                            }}
                            onClick = {goToPrevQuestion}
                        />
                    }
            </Card.Header>
            <Card.Body>
                <Card.Text>{question.question}</Card.Text>
                {
                    (() => {
                        switch (question.questiontype) {
                            case 'Radio':
                                return question.questionoption.map((currOption: any)=>
                                    <Form.Check
                                        checked={currOption.optionvalue === responses[question.questionid]}
                                        key={currOption.optionid}
                                        name={''+question.questionid}
                                        type='radio'
                                        onChange={()=>{changeHandler(question.questionid,currOption.optionvalue)}}
                                        label={currOption.optionvalue}
                                    />
                                )
                            case 'Checkbox':
                                return question.questionoption.map((currOption: any)=>
                                    <Form.Check
                                        checked={(responses[question.questionid]||[]).includes(currOption.optionvalue)}
                                        key={currOption.optionid}
                                        name={''+question.questionid}
                                        type='checkbox'
                                        onChange={(e)=>{checkboxChangeHandler(question.questionid,currOption.optionvalue,e.target.checked)}}
                                        label={currOption.optionvalue}
                                    />
                                )
                            case 'Textarea':
                                return question.questionoption.map((currOption: any)=>
                                    <Form.Control 
                                        key={currOption.optionid}
                                        as="textarea"
                                        value={responses[question.questionid]}
                                        name={''+question.questionid}
                                        onChange={(e)=>{changeHandler(question.questionid,e.target.value)}}
                                    />
                                )
                            case 'Date':
                                return question.questionoption.map((e: any)=>
                                    <Form.Control
                                        key={e.optionid}
                                        type='date'
                                        name={''+question.questionid}
                                        onChange={(e)=>{changeHandler(question.questionid,e.target.value)}}
                                        value={responses[question.questionid]}
                                    />
                                )
                            default:
                                break;
                        }
                    })()
                }
            </Card.Body>
            <Card.Footer>
                {
                    <Button
                        className='float-end'
                        variant='danger'
                        size='sm'
                        onClick={goToNextQuestion}
                    >
                        { questions.length - 1 === activeQuestionIndex? 'Submit' : 'Next' }
                    </Button>
                }
            </Card.Footer>
        </Card>
  )
}

export default QuestionCard