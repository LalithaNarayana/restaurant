/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function WaiterPage() {
    const [tasks, setTasks] = useState([]);
    const [newChef, setNewChef] = useState('');
    const [taskName, setTaskName] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get(`${API}/tasks`);
        setTasks(res.data);
    };

    const addChef = async () => {
        console.log(`User (Chef) Added: ${newChef}`);
        setNewChef('');
    };

    const addTask = async () => {
        await axios.post(`${API}/tasks`, { name: taskName, status: 'Incomplete', chef: newChef });
        setTaskName('');
        fetchTasks();
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    const updateTask = async () => {
        if (editingTask) {
            await axios.put(`${API}/tasks/${editingTask._id}`, editingTask);
            setEditingTask(null);
            fetchTasks();
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API}/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="waiter-page">
            <h1>Waiter Page</h1>
            <input
                type="text"
                placeholder="Add Chef Username"
                value={newChef}
                onChange={(e) => setNewChef(e.target.value)}
            />
            <input
                type="text"
                placeholder="Add Order"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button onClick={addTask} className="btn add-task-btn">Add Order</button>

            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="task-item">
                        ORDER : {task.name} | LINE-COOK_ID : {task.chef} | STATUS : {task.status}
                        <button onClick={() => editTask(task)} className="btn edit-task-btn">Edit</button>
                        <button onClick={() => deleteTask(task._id)} className="btn delete-task-btn">Cancel</button>
                    </li>
                ))}
            </ul>

            {editingTask && (
                <div className="edit-task-form">
                    <input
                        type="text"
                        placeholder="Edit Task Name"
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Edit Chef Username"
                        value={editingTask.chef}
                        onChange={(e) => setEditingTask({ ...editingTask, chef: e.target.value })}
                    />
                    <button onClick={updateTask} className="btn update-task-btn">Update Task</button>
                </div>
            )}
        </div>
    );
}

export default WaiterPage;