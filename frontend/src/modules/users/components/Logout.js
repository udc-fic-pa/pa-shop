import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import users from '../../users';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(users.actions.logout());
        navigate('/');
    }, [dispatch, navigate]);

    return null;

}

export default Logout;