import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Errors} from '../../common';
import * as actions from '../actions';
import backend from '../../../backend';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);

    const handleSubmit = async event => {

        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity()) {

            const response = await backend.userService.login(userName, password, () => {
                navigate('/users/login');
                dispatch(actions.logout());
            });

            if (response.ok) {
                dispatch(actions.loginCompleted(response.payload));
                navigate('/');
            } else {
                setBackendErrors(response.payload);
            }


        } else {
            setBackendErrors(null);
            setValidated(true);
        }

    }

    return (
        <div className="col-md-10 mx-auto">
            <p className="text-center">
                <Link to="/users/signup">
                    <FormattedMessage id="project.users.SignUp.title"/>
                </Link>
            </p>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Card className="bg-light border-dark">
                <Card.Header as="h5">
                    <FormattedMessage id="project.users.Login.title"/>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated}  onSubmit={e => handleSubmit(e)}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>
                                <FormattedMessage id="project.global.fields.userName"/>
                            </Form.Label>
                            <Col md={4}>
                                <Form.Control type="text" id="userName"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    autoFocus
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={3}>
                                <FormattedMessage id="project.global.fields.password"/>
                            </Form.Label>
                            <Col md={4}>
                                <Form.Control type="password" id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col md={{ span: 4, offset: 3 }}>
                                <Button type="submit">
                                    <FormattedMessage id="project.users.Login.title"/>
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Login;
