import React, { useState } from 'react';

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('none');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <button onClick={toggleForm}>Toggle Form</button>
      {showForm && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <select value={status} onChange={handleStatusChange}>
            <option value="none">None</option>
            <option value="doing">Doing</option>
            <option value="to-do">To-Do</option>
            <option value="done">Done</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
