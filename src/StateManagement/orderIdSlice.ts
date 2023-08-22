import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface OrderIdState {
    orderId: string;
}

// Define the initial state using that type
const initialState: OrderIdState = {
    orderId: '',
};

export const orderIdSlice = createSlice({
    name: 'orderId',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addOrderId: (state, action: PayloadAction<string>) => {
            state.orderId = action.payload;
        },
        cleanOrderId: state => {
            state.orderId = '';
        },
    },
});

const {
    reducer: orderId,
    actions: { addOrderId, cleanOrderId },
} = orderIdSlice;

export { orderId, initialState, addOrderId, cleanOrderId, orderIdSlice as default };
