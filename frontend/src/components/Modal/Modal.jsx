import "../../scss/modal.scss";

function Modal({ title, children }) {
  const closeModal = (e) => {
    console.log("close");
    e.preventDefault();
    const modal = document.getElementById("modal");
    modal.close();
  };

  return (
    <dialog id='modal'>
      <main className='modal__content'>
        <header className='modal__content__header'>{title}</header>
        <div className='modal__content__main'>{children}</div>
        <footer className='modal__content__footer'>
          <button className='primary__btn'>Update</button>
          <button className='secondary__btn' onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </main>
    </dialog>
  );
}

export default Modal;
