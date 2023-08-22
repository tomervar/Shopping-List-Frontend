import { configureStore } from '@reduxjs/toolkit';
import shoppingCartSlice from './shoppingCartSlice';
import categoriesSlice from './categoriesSlice';
import { orderIdSlice } from './orderIdSlice';

export const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartSlice.reducer,
        categories: categoriesSlice.reducer,
        orderId: orderIdSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
