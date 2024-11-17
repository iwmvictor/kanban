import "./../styles/KanbanBoard.css";
import React, { useEffect, useState } from 'react';
import Column from './Column';
import Loader from './Loader';
import "./../styles/KanbanBoard.css";

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
        { id: 1, title: 'To Do', filter: 'Created' },
        { id: 2, title: 'In Progress', filter: 'In Progress' },
        { id: 3, title: 'Completed', filter: 'Completed' },
        { id: 4, title: 'Cancelled', filter: 'Cancelled' }
    ];

    const groupedData = (filter) => data.filter((status) => status.systemStatus.label === filter);

    return (
        <div className="kanban-board">
            {columns.map((column) => (
                <Column
                    key={column.id}
                    title={column.title}
                    cards={groupedData(column.filter)}
                />
            ))}
        </div>
    );
};

export default KanbanBoard;
