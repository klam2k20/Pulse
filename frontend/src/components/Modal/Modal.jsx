import "../../scss/modal.scss";

function Modal({ title, children }) {
  return (
    <dialog id='modal'>
      <main className='modal__content'>
        <header className='modal__content__header'>{title}</header>
        <div className='modal__content__main'>{children}</div>
      </main>
    </dialog>
  );
}

export default Modal;
