import "../../scss/Modals/modal.scss";

function Modal({ children, close }) {
  return (
    <div id='modal' onClick={() => close()}>
      <main className='modal__content' onClick={(e) => e.stopPropagation()}>
        <div className='modal__content__main'>{children}</div>
      </main>
    </div>
  );
}

export default Modal;
