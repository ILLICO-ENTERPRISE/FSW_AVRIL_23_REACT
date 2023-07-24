import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    fullname: null,
    birthday: null,
    nationality: null,
    profession: null,
  },
  reducers: {
    saveUser: (state, { payload }) => {
      state = { ...payload };
    },
  },
});

export const { saveUser } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;