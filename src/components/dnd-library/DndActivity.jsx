import React from 'react';
import {Link} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const activity = [
    {
        id: '1',
        question: 'Photosynthesis',
        answers:[
            'Uses CO2',
            'Produces O2',
            'Uses sunlight',
            'Produces glucose',
            'prokaryotic cells'
        ]
    },
    {
        id: '2',
        question: 'Cellular Respiration',
        answers:[
            'Uses O2',
            'Produces CO2',
            'Uses glucose',
            'Produces ATP',
            'Eukaryotic cells',
        ]
    }
]


function DndActivity() {
    const [activityData] = React.useState(activity)
    // List of answers which also contain the activity id
    const [answerBank, setAnswerBank] = React.useState(activityData.map((item) => item.answers).flat())
    const[questions, setQuestions] = React.useState(activityData.map((item) => ({id: item.id, question: item.question, answers:[]})))

    const handleDragDrop = (result) => {
        const { source, destination } = result

        if(!destination)return;
        if(destination.droppableId === source.droppableId
            && destination.index === source.index) return;

        const newQuestions = Array.from(questions)
        const newAnswerBank = Array.from(answerBank)

        if(destination.droppableId === 'answerBank'){
            if(source.droppableId === 'answerBank'){
                const [removed] = newAnswerBank.splice(source.index, 1)
                newAnswerBank.splice(destination.index, 0, removed)
            }else{
                const sourceQuestion = newQuestions.find(question => question.question === source.droppableId)
                const [removed] = sourceQuestion.answers.splice(source.index, 1)
                newAnswerBank.splice(destination.index, 0, removed)
            }
        }else{
            if(source.droppableId === 'answerBank'){
                const question = newQuestions.find((question) => question.question  === destination.droppableId)
                const [removed] = newAnswerBank.splice(source.index, 1)
                question.answers.splice(destination.index, 0, removed)
            }else{
                const sourceQuestion = newQuestions.find(question => question.question === source.droppableId)
                const destinationQuestion = newQuestions.find(question => question.question === destination.droppableId)
                const [removed] = sourceQuestion.answers.splice(source.index, 1)
                destinationQuestion.answers.splice(destination.index, 0, removed)
            }
        }

        setAnswerBank(newAnswerBank)
        setQuestions(newQuestions)

    }

    const resetActivity = () => {
        setQuestions(activityData.map((item) => ({id: item.id, question: item.question, answers:[]})))
        setAnswerBank(activityData.map((item) => item.answers).flat())
    }

    const questionContainers = () =>{
        return (
            <>
                {questions.map((question) => {
                    return (
                        <Droppable key={question.question} droppableId={ question.question } type={'answer-group'}>
                            {(provided)=>(
                                <div className={'question-container'}
                                     {...provided.droppableProps}
                                     ref={provided.innerRef}>
                                    <div className="question-title">
                                        {question.question}
                                    </div>
                                    <div className="question-answers">
                                        {question.answers.map((answer, index) => {
                                            return (
                                                <Draggable draggableId={answer} key={answer} index={index}>
                                                    {(provided)=>(
                                                        <div className="answer"
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                             ref={provided.innerRef}>
                                                            {answer}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    )})
                }
            </>
        )
    }


    return (
        <div>
            <h1>DND Library activity sample</h1>
            <div className="link-container">
                <Link className={'link'} to={'/'}>Home</Link>
                <Link className={'link'} to={'/dnd'}>DND Library</Link>
                <Link className={'link'} to={'/native'}>Native Implementation</Link>
            </div>
            <DragDropContext
                onDragEnd={handleDragDrop}>
                <div className="dnd-activity">
                    { questionContainers() }
                    <Droppable droppableId={'answerBank'} type={'answer-group'}>
                        {(provided)=>(
                            <div className={'answer-container'} {...provided.droppableProps} ref={provided.innerRef}>
                                {answerBank.map((answer, index) => {
                                    return (
                                        <Draggable draggableId={answer} key={answer} index={index}>
                                            {(provided)=>(
                                                <div className="answer"
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                     ref={provided.innerRef}>
                                                    {answer}
                                                </div>
                                            )}
                                        </Draggable>
                                    )})
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default DndActivity;