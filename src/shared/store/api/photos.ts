import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllPhotos = createAsyncThunk('user/getAllPhotos', async (_, thunkAPI) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Не удалось загрузить фотографии');
    }
});
