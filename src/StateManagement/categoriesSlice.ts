import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CategoriesState {
    categories: Array<{
        categoryId: string;
        categoryName: string;
        categoryImgLocation: string;
        totalItems: number;
        items: Array<{ itemName: string; quantity: number }>;
    }>;
}

// Define the initial state using that type
const initialState: CategoriesState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addCategory: (
            state,
            action: PayloadAction<{
                categoryId: string;
                categoryName: string;
                categoryImgLocation: string;
                totalItems: number;
                items: Array<{ itemName: string; quantity: number }>;
            }>,
        ) => {
            state.categories.push(action.payload);
        },
        cleanCategories: state => {
            state.categories = [];
        },
        addItemToCategory: (state, action: PayloadAction<{ categoryName: string; itemName: string }>) => {
            const categoryIndex = state.categories.findIndex(c => c.categoryName === action.payload.categoryName);
            if (categoryIndex !== -1) {
                // Find the category
                const category = state.categories[categoryIndex];
                // Find the index of the item with the given itemName in the category's items array
                const itemIndex = category.items.findIndex(item => item.itemName === action.payload.itemName);
                if (itemIndex !== -1) {
                    // If the item already exists in the category, increment its quantity by 1
                    state.categories[categoryIndex].items[itemIndex].quantity += 1;
                } else {
                    // If the item doesn't exist, add it to the category's items array with a quantity of 1
                    state.categories[categoryIndex].items.push({ itemName: action.payload.itemName, quantity: 1 });
                }
                state.categories[categoryIndex].totalItems += 1;
            }
        },
    },
});

const {
    reducer: categories,
    actions: { addCategory, addItemToCategory, cleanCategories },
} = categoriesSlice;

export { categories, initialState, addCategory, addItemToCategory, cleanCategories, categoriesSlice as default };
