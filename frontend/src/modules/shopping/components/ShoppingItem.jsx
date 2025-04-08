import {useState} from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {ProductLink} from '../../common';

const ShoppingItem = ({shoppingItemListId, item, edit, onUpdateQuantity, 
    onRemoveItem, onBackendErrors}) => {

    const [quantity, setQuantity] = useState(item.quantity);
    const [formValidated, setFormValidated] = useState(false);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            setFormValidated(false);
            onUpdateQuantity(shoppingItemListId,
                item.productId, quantity, 
                () => onBackendErrors(null), 
                backendErrors => {
                    setQuantity(item.quantity);
                    onBackendErrors(backendErrors);
                });

        } else {

            onBackendErrors(null);
            setFormValidated(true);

        }
    
    }

    const handleRemoveItem = () => {

        onRemoveItem(shoppingItemListId,
            item.productId, 
            () => onBackendErrors(null), 
            backendErrors => onBackendErrors(backendErrors));

    }

    return (
        <tr>                   
            <td>
                { edit &&
                <Button type="button" variant="danger" className="me-2"
                    onClick={() => handleRemoveItem()}>
                    <span className="fa-solid fa-trash-can"></span>
                </Button>
                }
                <ProductLink id={item.productId} name={item.productName}/>
            </td>
            <td>
                <FormattedNumber value={item.productPrice} style="currency" currency="EUR"/>    
            </td>
            { edit &&
            <td>
                <Form ref={node => form = node}
                    noValidate validated={formValidated} onSubmit={e => handleSubmit(e)}>
                    <Row>
                        <Col md={8}>
                            <Form.Control type="number"
                                value={quantity}
                                onChange={e => setQuantity(Number(e.target.value))}
                                min="1"/>
                            <Form.Control.Feedback type="invalid">
                                <FormattedMessage id='project.global.validator.incorrectQuantity'/>
                            </Form.Control.Feedback>
                        </Col>
                        <Col md={2}>
                            <Button type="submit">
                                <FormattedMessage id="project.global.buttons.save"/>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </td>
            }
            {!edit && <td>{item.quantity}</td>}
        </tr>
    );

}

export default ShoppingItem;
