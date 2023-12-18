import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {markTaskAsCompleted, selectTasks} from './TaskListSlice';
import {
  deleteTask,
  fetchTasks,
} from './TaskThunks';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import {AppDispatch, RootState} from '../../app/store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import Spinner from '../Spinner/Spinner';

interface Task {
  id: string;
  title: string;
  status: boolean;
}

const TaskList: React.FC = () => {
  const dispatch: ThunkDispatch<AppDispatch, RootState, undefined> = useDispatch();
  const tasks: Task[] = useSelector(selectTasks);
  const isLoading: boolean = useSelector((state: RootState) => state.taskList.loading);
  const [localState, setLocalState] = useState<Task[]>([])


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    setLocalState(localState.filter((task) => task.id !== id))
  };

  useEffect(() => {
    setLocalState(tasks)
  }, [tasks])

  const handleTaskCompletion = (id: string) => {
    dispatch(markTaskAsCompleted(id));
  };

  return (
    <div className="todoApp">
      <NewTaskForm/>
      {isLoading ? (
        <Spinner/>
      ) : (
        <div className="task-list">
          {localState.map((task) => (
            <p key={task.id} className={`task-item status:${task.status}`}>
              <span>{task.title}</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={task.status}
                onChange={() => handleTaskCompletion(task.id)}
              />
              <button
                className="btn btn-danger delete-btn"
                onClick={() => handleDelete(task.id)}
              />
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
