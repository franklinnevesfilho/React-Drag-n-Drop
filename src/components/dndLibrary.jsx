import React from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Link} from "react-router-dom";


const STORES = [
    {
        id: '50',
        name: 'Walmart',
        items: [
            {
                id: '51',
                name: 'Milk'
            },
            {
                id: '52',
                name: 'Eggs'
            },
            {
                id: '53',
                name: 'Bread'
            }
        ]
    },
    {
        id: '60',
        name: 'Target',
        items: [
            {
                id: '61',
                name: 'shampoo'
            },
            {
                id: '62',
                name: 'toothbrush'
            },
            {
                id: '63',
                name: 'paper'
            }
        ]
    },
    {
        id: '70',
        name: 'Costco',
        items: [
            {
                id: '71',
                name: 'Milk'
            },
            {
                id: '72',
                name: 'Eggs'
            },
            {
                id: '73',
                name: 'Bread'
            }
        ]
    },
    {
        id: '80',
        name: 'Safeway',
        items: [
            {
                id: '81',
                name: 'pizza'
            },
            {
                id: '82',
                name: 'protein'
            },
            {
                id: '83',
                name: 'cheese'
            }
        ]
    }
]
function DndLibrary() {

    const [stores, setStores] = React.useState(STORES)

    const handleDragDrop = (results) => {
        const {source, destination, type}  = results

        if(!destination) return;
        if(source.droppableId === destination.droppableId
            && source.index === destination.index) return;
        if(type === 'group'){
            const newStores = Array.from(stores)
            const [removed] = newStores.splice(source.index, 1)
            newStores.splice(destination.index, 0, removed)
            setStores(newStores)
        }
        if(type === 'group2'){
            const newStores = Array.from(stores)
            const sourceStore = newStores.find(store => store.id === source.droppableId)
            const destinationStore = newStores.find(store => store.id === destination.droppableId)
            const [removed] = sourceStore.items.splice(source.index, 1)
            destinationStore.items.splice(destination.index, 0, removed)
            setStores(newStores)
        }
    }

    const storesList = stores.map((store, index) => {
        return (
            <Draggable draggableId={store.id} key={store.id} index={index}>
                {(provided)=>(
                    <div className="section"
                         {...provided.dragHandleProps}
                         {...provided.draggableProps}
                         ref={provided.innerRef}>
                        {store.name}
                        <div className="item-container">
                            <Droppable droppableId={store.id} type={'group2'}>
                                {(provided)=>(
                                    <div className={'items-droppable'} {...provided.droppableProps} ref={provided.innerRef}>
                                        {store.items.map((item, index) => {
                                            return (
                                                <Draggable draggableId={item.id} key={item.id} index={index}>
                                                    {(provided)=>(
                                                        <div className="item"
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                             ref={provided.innerRef}>
                                                            {item.name}
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
                    </div>
                )}
            </Draggable>
        )})

    return (
        <div>
            <h1>React-Beautiful-Dnd</h1>
            <p>Some disadvantages:</p>
            <ul>
                <li>React.strictMode from Main.jsx needs to be removed</li>
                <li>Not as much control over the drag and drop</li>
                <li>Not as much control over the styling</li>
                <li>Not as much control over the animations</li>
            </ul>
            <div className="link-container">
                <Link className={'link'} to={'/'}>Home</Link>
                <Link className={'link'} to={'/dnd/activity-sample'}>Activity Sample</Link>
                <Link className={'link'}  to={'/native'}>Native Implementation</Link>
            </div>
            <div className="content">
                <DragDropContext
                    onDragEnd={handleDragDrop}>
                    <div className="header">
                        <h1>Shopping List</h1>
                    </div>
                    <Droppable droppableId={'ROOT'} type={'group'}>
                        {(provided)=>(
                            <div className={'droppable'} {...provided.droppableProps} ref={provided.innerRef}>
                                {storesList}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default DndLibrary;