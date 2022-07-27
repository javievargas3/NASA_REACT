import { createSlice } from '@reduxjs/toolkit';


const rootSlice = createSlice({
    name: "root",
    initialState: {
        date: 'date',
        title: 'title',
        comments: 'comments'
    },
    reducers: {
        chooseDate: (state, action) => { state.date = action.payload},
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseComments: (state, action) => { state.comments = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseDate, chooseTitle, chooseComments} = rootSlice.actions;