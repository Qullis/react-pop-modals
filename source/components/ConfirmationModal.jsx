import '../lib/bootstrap-5.3.3/css/scoped-bootstrap.css';
import { Modal } from 'bootstrap';

export const ConfirmationModal = ({ modalHeader, bodyText, modalId, callback, callbackArgs, style, buttonText }) => {
    const runCallback = async () => {
        try {
            await callback(callbackArgs);
            const modal = Modal.getInstance(`#${modalId}`);
            modal.hide();
        } catch (error) {
            const modal = Modal.getInstance(`#${modalId}`);
            modal.hide();
        }
    };

    return (
        <div className='reactModals'>
            <div className="modal fade" id={modalId} tabIndex="-1">
                <div className="modal-dialog">
                    <div className={"modal-content " + style.modal}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{modalHeader}</h1>
                            <button type="button" className={"btn-close " + style.xButton} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {bodyText}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={style.closeButton} data-bs-dismiss="modal">{buttonText.closeButton}</button>
                            <button type="button" className={style.actionButton} onClick={() => runCallback()} >{buttonText.actionButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};