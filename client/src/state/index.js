import { createSlice } from "@reduxjs/toolkit";

//These states are Applicable throughout like global variables
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    //functions to perform specific tasks. 

    //changes mode of the look
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    //ensures login for the specific user by using the user and the token for the user
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    //sets the user and token to null so as to ensure logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    //for accessing friends of the user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent.");
      }
    },

    //to set the post
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    //maps through the posts and if the current send post id is equal to the post id, post will be returned
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;