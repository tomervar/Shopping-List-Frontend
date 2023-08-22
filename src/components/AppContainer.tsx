import styled from 'styled-components';
import { NavMenu } from './NavMenu';
import { MainShoppingContainer } from './MainShoppingContainer';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

export const AppContainer = () => {
    return (
        <MainContainer>
            <NavMenu />
            <MainShoppingContainer />
        </MainContainer>
    );
};
