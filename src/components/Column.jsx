import React from 'react';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';

import './../styles/Column.css'

const Column = ({ id, title, cards }) => {
    return (
        <div className="kanban-column">
            <h2>{title}</h2>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="column-cards"
                    >
                        {cards.length > 0 ? (
                            cards.map((card, index) => (
                                <Card key={card.id} card={card} index={index} />
                            ))
                        ) : (
                            <p>No items</p>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
