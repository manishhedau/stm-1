import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const studentsSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {
        getAllStudents: (state, action) => {
            state.push(...action.payload);
        },
        deleteStudent: (state, action) => {
            const index = state.findIndex((studentDetail) => studentDetail._id === action.payload._id);
            if (index === -1) return;
            state.splice(index, 1);
        },
        sortByBirthDay: (state, action) => {
            const arr = [...action.payload];
            arr.sort(function (a, b) {
                var c = new Date(a.DOB);
                var d = new Date(b.DOB);
                return d - c;
            });

            state.splice(0);
            state.push(...arr);
        },
        sortByIncreasePercent: (state, action) => {
            const arr = [...action.payload];
            arr.sort(function (a, b) {
                return a.percentage - b.percentage;
            });

            state.splice(0);
            state.push(...arr);
        },
        sortByDecreasePercent: (state, action) => {
            const arr = [...action.payload];
            arr.sort(function (a, b) {
                return b.percentage - a.percentage;
            });

            state.splice(0);
            state.push(...arr);
        }
    },
});


export const { getAllStudents, deleteStudent, sortByBirthDay, sortByIncreasePercent, sortByDecreasePercent } = studentsSlice.actions
export default studentsSlice.reducer;
