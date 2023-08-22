import { store } from './StateManagement/store';
import { AppContainer } from './components/AppContainer';
import { Provider } from 'react-redux';

export const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};
