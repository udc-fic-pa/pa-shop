import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import users from '../../users';
import catalog from '../../catalog';
import backend from '../../../backend';

const App = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const findAllCategories = async () => {
            const response = await backend.catalogService.findAllCategories();
            if (response.ok) {
                dispatch(catalog.actions.findAllCategoriesCompleted(response.payload));
            }
        }

        const tryLoginFromServiceToken = async () => {
            const response = await backend.userService.tryLoginFromServiceToken(() => {
                navigate('/users/login');
                dispatch(users.actions.logout());
            });
            if (response.ok) {
                dispatch(users.actions.loginCompleted(response.payload));
            }
        }

        tryLoginFromServiceToken();
        findAllCategories();

    }, [dispatch]);

    return (
        <div>
            <Header/>
            <Body/>
            <Footer/>
        </div>
    );

}

export default App;
