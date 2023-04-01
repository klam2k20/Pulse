import '../../scss/Modals/modal.scss';

function Modal({ children, close }) {
  return (
    <div role='dialog' id='modal' onClick={() => close()}>
      <main className='modal__content__wrapper' onClick={(e) => e.stopPropagation()}>
        <div className='modal__content'>{children}</div>
      </main>
    </div>
  );
}

export default Modal;
