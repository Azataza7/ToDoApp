import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {markTaskAsCompleted, selectTasks} from './TaskListSlice';
import {
  deleteTask,
  fetchTasks,
} from './TaskThunks';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import {AppDispatch, RootState} from '../../app/store';
import {ThunkDispatch} from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  status: boolean;
}

const TaskList: React.FC = () => {
  const dispatch: ThunkDispatch<AppDispatch, RootState, undefined> = useDispatch();
  const tasks: Task[] = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleTaskCompletion = (id: string) => {
    dispatch(markTaskAsCompleted(Number(id)));
  };

  return (
    <div className="todoApp">
      <NewTaskForm/>
      <div className="task-list">
        {tasks.map((task) => (
          <p key={task.id} className="task-item">
            <span>{task.title}</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.status}
              onChange={() => handleTaskCompletion(task.id)}
            />
            <button className="btn btn-danger delete-btn" onClick={() => handleDelete(Number(task.id))}/>
          </p>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
