import styled from 'styled-components';
import Box from '@mui/material/Box';
import { CategoryCard } from './CategoryCard';
import { useAppSelector } from '../StateManagement/hooks';
import { CategoriesState } from '../StateManagement/categoriesSlice';

const MainBottomAppContainer = styled(Box)`
    && {
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`;

export const BottomAppContainer = () => {
    const { categories } = useAppSelector<CategoriesState>(state => state.categories);
    // Filter out categories with totalItems === 0
    const filteredCategories = categories.filter(c => c.totalItems > 0);

    return (
        <MainBottomAppContainer>
            {filteredCategories.map(c => (
                <CategoryCard
                    key={c.categoryName}
                    title={c.categoryName}
                    itemCount={c.totalItems}
                    imagePath={c.categoryImgLocation}
                    items={c.items}
                />
            ))}
        </MainBottomAppContainer>
    );
};
