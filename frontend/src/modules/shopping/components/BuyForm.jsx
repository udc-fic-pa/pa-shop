import {useState} from 'react';
import {useDispatch} from 'react-redux';
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

const BuyForm = ({shoppingCartId}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postalAddress, setPostalAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [formValidated, setFormValidated] = useState(false);
    let form;

    const handleSubmit = async event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const response = await backend.shoppingService.buy(shoppingCartId, 
                postalAddress, postalCode);

            if (response.ok) {
                dispatch(actions.buyCompleted(response.payload));
                navigate('/shopping/purchase-completed');
            } else {
                setBackendErrors(response.payload);
            }
            
        } else {
            setBackendErrors(null);
            setFormValidated(true);
        }

    }

    return (

        <div className="col-md-10 mx-auto">
            <Errors errors={backendErrors}
                onClose={() => setBackendErrors(null)}/>
            <Card className="bg-light border-dark">
                <Card.Header as="h5">
                    <FormattedMessage id="project.shopping.BuyForm.title"/>
                </Card.Header>
                <Card.Body>
                    <Form ref={node => form = node}
                        validated={formValidated} noValidate
                        onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group as={Row} className="mb-3" controlId="postalAddress">
                            <Form.Label column md={3}>
                                <FormattedMessage id="project.global.fields.postalAddress"/>
                            </Form.Label>
                            <Col md={4}>
                                <Form.Control type="text"
                                    value={postalAddress}
                                    onChange={e => setPostalAddress(e.target.value)}
                                    autoFocus
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="postalCode">
                            <Form.Label column md={3}>
                                <FormattedMessage id="project.global.fields.postalCode"/>
                            </Form.Label>
                            <Col md={4}>
                                <Form.Control type="text"
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)}
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md={{ span: 4, offset: 3 }}>
                                <Button type="submit">
                                    <FormattedMessage id="project.global.buttons.buy"/>
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    );

}

export default BuyForm;
