import styled from 'styled-components';
import { TopAppContainer } from './TopAppContainer';
import { BottomAppContainer } from './BottomAppContainer';

const ShoppingContainer = styled.div`
    height: 90%;
    width: 95%;
    display: flex;
    flex-direction: column;
    padding: 2%;
`;

export const MainShoppingContainer = () => {
    return (
        <ShoppingContainer>
            <TopAppContainer />
            <BottomAppContainer />
        </ShoppingContainer>
    );
};
