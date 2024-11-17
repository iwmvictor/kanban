import React, { useEffect, useState } from 'react';
import Column from './Column';
import Loader from './Loader';
import { DragDropContext } from 'react-beautiful-dnd';

import './../styles/KanbanBoard.css'

const KanbanBoard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData[0].status); // Assuming the statuses are in the first workflow
                setLoading(false);
            })
            .catch((error) => console.error('Error loading data:', error));
    }, []);

    if (loading) {
        return <Loader />;
    }

    const columns = [
        { id: '1', title: 'To Do', filter: 'Created' },
        { id: '2', title: 'In Progress', filter: 'In Progress' },
        { id: '3', title: 'Completed', filter: 'Completed' },
        { id: '4', title: 'Cancelled', filter: 'Cancelled' }
    ];

    const groupedData = (filter) =>
        data.filter((status) => status.systemStatus.label === filter);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const sourceColumn = columns.find(
            (column) => column.id === source.droppableId
        );
        const destinationColumn = columns.find(
            (column) => column.id === destination.droppableId
        );

        const sourceCards = groupedData(sourceColumn.filter);
        const destinationCards = groupedData(destinationColumn.filter);

        const [removedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, removedCard);

        setData((prevData) =>
            prevData.map((item) => {
                if (item === removedCard) {
                    return {
                        ...item,
                        systemStatus: { ...item.systemStatus, label: destinationColumn.filter }
                    };
                }
                return item;
            })
        );
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={groupedData(column.filter)}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
