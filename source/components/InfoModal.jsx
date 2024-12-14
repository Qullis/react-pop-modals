import '../lib/bootstrap-5.3.3/css/scoped-bootstrap.css';

export const InfoModal = ({ modalHeader, bodyText, modalId, style, buttonText }) => {

    return (
        <>
            <div className='reactModals'>
                <div className="modal fade" id={modalId} tabindex="-1">
                    <div className="modal-dialog">
                        <div className={"modal-content " + style.modal}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{modalHeader}</h1>
                                <button type="button" className={"btn-close " + style.xButton} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {bodyText}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className={style.closeButton} data-bs-dismiss="modal">{buttonText.closeButton}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

