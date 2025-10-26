

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) return null;

    return (
        <div className="fixed insert-0 modal-overlay bg-black bg-opacity-30 flex justify-center items-start z-50" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal