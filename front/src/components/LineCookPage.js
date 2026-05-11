import React, { useState } from 'react';
import axios from 'axios';

function LineCookPage() {
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/tasks?chef=${username}`);
        setTasks(response.data);
        setLoggedIn(true);
    };

    const completeTask = async (id) => {
        await axios.put(`http://localhost:5000/tasks/${id}`, { status: 'completed' });
        fetchTasks();
    };

    return (
        <div className="line-cook-page">
            <h1>Line Cook Page</h1>
            {!loggedIn ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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