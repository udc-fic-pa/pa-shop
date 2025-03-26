import {useIntl, FormattedMessage} from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {NetworkError} from '../../../backend';

const ErrorDialog = ({error, onClose}) => {

    const intl = useIntl();

    if (error == null) {
        return null;
    }

    const modalStyle = {display: 'block'}; 
    const message = error instanceof NetworkError ?
        intl.formatMessage({id: 'project.global.exceptions.NetworkError'}) :
        error.message;

    return (

        <div className="modal" style={modalStyle}>

            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>
                        <FormattedMessage id="project.common.ErrorDialog.title"/>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>
                        <FormattedMessage id="project.global.buttons.close"/>
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>

        </div>

    );

};

export default ErrorDialog;
