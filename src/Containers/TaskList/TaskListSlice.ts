import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchTasks} from './TaskThunks';

interface Task {
  id: number;
  title: string;
  status: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasksList',
  initialState,
  reducers: {
    markTaskAsCompleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const taskToComplete: Task = state.tasks.find((task) => task.id === taskId);
      if (taskToComplete) {
        taskToComplete.status = !taskToComplete.status;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.pending, (state: TasksState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state: TasksState, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state: TasksState) => {
      state.loading = false;
      state.error = 'Something got wrong';
    });
  }
});

export const taskReducer = tasksSlice.reducer;
export const {markTaskAsCompleted} = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.taskList.tasks;
