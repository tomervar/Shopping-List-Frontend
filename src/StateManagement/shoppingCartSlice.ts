import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CounterState {
    value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
};

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
    },
});

const {
    reducer: shoppingCart,
    actions: { increment },
} = shoppingCartSlice;

export { shoppingCart, initialState, increment, shoppingCartSlice as default };
