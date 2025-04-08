import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import backend from '../../../backend';
import Row from "react-bootstrap/Row";

const AddToShoppingCart = ({productId}) => {

    const shoppingCart = useSelector(selectors.getShoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [formValidated, setFormValidated] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = async event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const response = await backend.shoppingService.addToShoppingCart(shoppingCart.id, 
                productId, quantity);

            if (response.ok) {
                dispatch(actions.shoppingCartUpdated(response.payload));
                navigate('/shopping/shopping-cart');
            } else {
                setBackendErrors(response.payload);
            }

        } else {

            setBackendErrors(null);
            setFormValidated(true);

        }

    }

    return (
        <>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Form ref={node => form = node}
                noValidate validated={formValidated}
                onSubmit={e => handleSubmit(e)}>
                <Form.Group as={Row} className="mb-3" controlId="quantity">
                    <Form.Label column md={{ span: 1, offset: 5 }}>
                        <FormattedMessage id="project.global.fields.quantity"/>
                    </Form.Label>
                    <Col md={2}>
                        <Form.Control type="number"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            autoFocus
                            min="1" />
                        <Form.Control.Feedback type="invalid">
                            <FormattedMessage id='project.global.validator.incorrectQuantity'/>
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col md={{ span: 2, offset: 6 }}>
                        <Button type="submit">
                            <FormattedMessage id="project.shopping.AddToCart.add"/>
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );

}


export default AddToShoppingCart;
