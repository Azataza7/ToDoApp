import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

interface Task {
  title: string;
  status: boolean;
}

interface TaskJson {
  [id: string]: Task;
}

export const createTask = createAsyncThunk<Task, Task>(
  'tasks/createTask',
  async (taskData) => {
    const response = await axiosApi.post<Task>('/tasks.json', taskData);
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk<Task[], void>(
  'tasks/fetchTasks',
  async () => {
    const response = await axiosApi.get<TaskJson>('/tasks.json');
    const data = response.data;
    const taskList =  Object.keys(data).map((taskId) => ({
      id: taskId,
      ...data[taskId]
    }));
    return taskList.reverse()
  });

export const deleteTask = createAsyncThunk<void, number>(
  'tasks/deleteTask',
  async (id: number) => {
    await axiosApi.delete(`/tasks/${id}.json`);
  });