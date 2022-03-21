import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  id: number | null;
  name: string | null;
  isAuth: boolean;
  token: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  token: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        isAuth: boolean;
        token: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuth = true;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.id = null;
      state.name = null;
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { login, signOut } = authSlice.actions;
export default authSlice.reducer;
