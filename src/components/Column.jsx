import React from 'react';
import Card from './Card';
import './../styles/Column.css';

const Column = ({ title, cards }) => {
    return (
        <div className="kanban-column">
            <h2>{title}</h2>
            {cards.length > 0 ? (
                cards.map((card) => <Card key={card.id} card={card} />)
            ) : (
                <p>No items</p>
            )}
        </div>
    );
};

export default Column;
