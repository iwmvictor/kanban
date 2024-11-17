import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './../styles/Card.css'

const Card = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="kanban-card"
                >
                    <h3>{card.code}</h3>
                    <p>{card.description}</p>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
