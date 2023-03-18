import "../../scss/modal.scss";

function Modal({ title, children, close }) {
  return (
    <div id='modal' onClick={() => close()}>
      <main className='modal__content' onClick={(e) => e.stopPropagation()}>
        <header className='modal__content__header'>{title}</header>
        <div className='modal__content__main'>{children}</div>
      </main>
    </div>
  );
}

export default Modal;
