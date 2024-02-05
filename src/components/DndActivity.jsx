import React, {useEffect} from 'react';
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


function DndActivity(props) {
    const [activityData, setActivityData] = React.useState(activity)
    // List of answers which also contain the activity id
    const [answers, setAnswers] = React.useState(activityData.map((item) => item.answers).flat())
    const[questions, setQuestions] = React.useState(activityData.map((item) => ({id: item.id, question: item.question, answers:[]})))

    const handleDragDrop = (result) => {
        const {destination, source, draggableId} = result

        if(!destination) return
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) return
        else if(destination.droppableId === source.droppableId) return;
        else{
            const newQuestions = Array.from(questions)
            const newAnswers = Array.from(answers)
            const draggedItem = newAnswers.splice(source.index, 1)
            newQuestions.find(question => {
                if(question.id === destination.droppableId){
                    question.answers.push(draggedItem[0])
                    console.log('added: ' + question.answers)
                }
            })
            setAnswers(newAnswers)
            setQuestions(newQuestions)
        }

        console.log(result)

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
                    {
                        questions.map((question, index) => {
                            return (
                                <Droppable key={index} droppableId={question.id} type={'answer-group'}>
                                    {(provided)=>(
                                        <div className={'question-container'} {...provided.droppableProps} ref={provided.innerRef}>
                                            <div className="question-title">
                                                {question.question}
                                            </div>
                                            <div className="question-answers">
                                                {question.answers.map((answer, index) => {
                                                    return (
                                                        <div key={index} className="answer">
                                                            {answer}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })
                    }
                    <Droppable droppableId={'0'} type={'answer-group'}>
                        {(provided)=>(
                            <div className={'answer-container'} {...provided.droppableProps} ref={provided.innerRef}>
                                {answers.map((answer, index) => {
                                    return (
                                        <Draggable draggableId={index.toString()} key={index} index={index}>
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