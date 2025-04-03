import { createSlice } from '@reduxjs/toolkit';
import { generateShortUUID } from '../../utils/uuid';

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        loading: false,
        error: null
    },
    reducers: {
        setTransactions: (state, action) => {
            // Sort transactions by date in descending order (newest first)
            const sortedTransactions = [...action.payload].sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );
            state.transactions = sortedTransactions;
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
            const transaction = {
                ...action.payload,
                uuid: action.payload.uuid || generateShortUUID(),
                date: action.payload.date || new Date().toISOString()
            };
            // Add new transaction at the beginning of the array
            state.transactions.unshift(transaction);
        }
    }
});

export const { setTransactions, setLoading, setError, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer; 