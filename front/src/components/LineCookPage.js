/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function LineCookPage() {
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchTasks = async () => {
        const res = await axios.get(`${API}/tasks?chef=${username}`);
        setTasks(res.data);
        setLoggedIn(true);
    };

    const completeTask = async (id) => {
        await axios.put(`${API}/tasks/${id}`, { status: 'completed' });
        fetchTasks();
    };

    return (
        <div className="line-cook-page">
            <h1>Line Cook Page</h1>
            {!loggedIn ? (
                <div>
                    <input type="text" placeholder="Enter Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={fetchTasks} className="btn login-btn">Login</button>
                </div>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            {task.name} | STATUS : {task.status}
                            {task.status === 'Incomplete' && (
                                <button onClick={() => completeTask(task._id)} className="btn complete-task-btn">
                                    Mark Completed
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LineCookPage;