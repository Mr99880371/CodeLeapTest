import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

// GET posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.results;
});

// POST new post
export const createPost = createAsyncThunk('posts/createPost',  async (newPost) => {
    const response = await axios.post(BASE_URL, {
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      time: 'just now',
    });
    return response.data;
});

// PATCH post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
  const response = await axios.patch(`${BASE_URL}${id}/`, { title, content });
  return response.data;
});

// DELETE post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`${BASE_URL}${id}/`);
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // adiciona no topo
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
