import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  name: "",
  email: "",
  accessToken: "",
  sameUserList: [],
  isLogin: false,
  loginType: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.isLogin = action.payload.isLogin;
      state.loginType = action.payload.loginType;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setSameUserList(state, action) {
      state.sameUserList = [...action.payload];
    },
    userSliceReset(state) {
      state.uid = "";
      state.email = "";
      state.name = "";
      state.accessToken = "";
      state.sameUserList = [];
      state.isLogin = false;
      state.loginType = "";
    },
  },
  //extraReducer는 비동기 액션 생성시 필요
  // extraReducers: builder => {},
});

export const {
  setUser,
  setName,
  setEmail,
  setAccessToken,
  setSameUserList,
  userSliceReset,
} = userSlice.actions;
export default userSlice.reducer;
