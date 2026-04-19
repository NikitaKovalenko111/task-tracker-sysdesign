import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const initialState: UserState = {
  firstName: 'Алексей',
  lastName: 'Петров',
  email: 'alex.petrov@mail.com',
  role: 'Product Manager',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
