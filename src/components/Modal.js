import React from 'react'
import "./modal.css";

function Modal({ isVisible, toggleIsVisible, toggleIsConfirm }) {
    const showHideClassName = isVisible ? "modal display-block" : "modal display-none";

    // var myModal = document.getElementById('myModal')
    // var myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus()
    // })

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="header">
                    <h4>DO you want to delete the student?</h4>
                </div>
                <div className="modal-body">
                    <button type="button" onClick={toggleIsVisible} className="btn btn-primary">
                        Close
                    </button>
                    <button type="button" onClick={toggleIsConfirm} className="btn btn-primary">
                        Confirm
                    </button>
                </div>
            </section>
        </div>
    );

}

export default Modal
