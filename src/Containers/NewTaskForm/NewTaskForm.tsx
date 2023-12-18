import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {createTask, fetchTasks} from '../TaskList/TaskThunks';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {AppDispatch} from '../../app/store';

interface Task {
  title: string;
  status: boolean;
}

const NewTaskForm: React.FC = () => {
  const dispatch: ThunkDispatch<AppDispatch, undefined, undefined> = useDispatch();
  const [taskData, setTaskData] = useState<Task>({
    title: '',
    status: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskData.title.trim()) {
      dispatch(createTask(taskData));
      setTaskData({ title: '', status: false});
      dispatch(fetchTasks())
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskData({ ...taskData, title: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        className="form-control"
        type="text"
        value={taskData.title}
        onChange={handleInputChange}
        placeholder="Enter task title"
      />
      <button className="btn btn-primary " type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
