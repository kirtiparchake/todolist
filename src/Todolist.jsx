import React, { useState, useEffect } from 'react';

function Todo() {
  const [activity, setActivity] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const storedListData = localStorage.getItem('todoList');
    if (storedListData) {
      console.log('Retrieved data from localStorage:', JSON.parse(storedListData));
      setListData(JSON.parse(storedListData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(listData));
    console.log('Saved data to localStorage:', listData);
  }, [listData]);

  function addActivity() {
    if (editIndex !== null) {
      const updatedListData = [...listData];
      updatedListData[editIndex] = activity;
      setListData(updatedListData);
      setActivity('');
      setEditIndex(null);
    } else {
      if (activity.trim() !== '') {
        setListData((prevListData) => [...prevListData, activity]);
        setActivity('');
      }
    }
  }

  function removeActivity(index) {
    const updatedListData = listData.filter((_, i) => i !== index);
    setListData(updatedListData);
  }

  function editActivity(index) {
    setActivity(listData[index]);
    setEditIndex(index);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>To Do List</h1>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Add a task..."
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        {editIndex !== null ? (
          <button onClick={addActivity}>Save</button>
        ) : (
          <button onClick={addActivity}>Add</button>
        )}
      </div>
      <div className="tasks">
        {listData.map((data, i) => (
          <div className="task" key={i}>
            {editIndex === i ? (
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            ) : (
              <div className="listdata">{data}</div>
            )}
            <button onClick={() => removeActivity(i)}>Delete</button>
            <button onClick={() => editActivity(i)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
