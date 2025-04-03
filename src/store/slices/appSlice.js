import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    hasCompletedBiometrics: false,
    encryptedPin: null
  },
  reducers: {
    setEncryptedPin: (state, action) => {
      state.encryptedPin = action.payload;
    },
    setBiometricsCompleted: (state, action) => {
      state.hasCompletedBiometrics = action.payload;
    },
    resetBiometrics: (state) => {
      state.hasCompletedBiometrics = false;
    }
  }
});

export const { setEncryptedPin, setBiometricsCompleted, resetBiometrics } = appSlice.actions;
export default appSlice.reducer;