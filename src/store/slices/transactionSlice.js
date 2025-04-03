import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        loading: false,
        error: null
    },
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        addTransaction: (state, action) => {
            state.transactions.unshift(action.payload);
        }
    }
});

export const { setTransactions, setLoading, setError, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer; 