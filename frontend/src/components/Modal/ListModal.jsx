import Modal from './Modal';
import '../../scss/Modals/listModal.scss';
import AppError from '../StatusIndicator/AppError';

function ListModal({ list, title, isOpen, close, isError }) {
  return (
    <div className='app__list__modal'>
      {isOpen && (
        <Modal close={close}>
          <header className='app__list__header'>
            <h4>{title}</h4>
          </header>
          <ul className='app__list'>
            {isError && (
              <AppError
                text={`Couldn't Load ${title}.`}
                buttonText='TRY AGAIN'
                onClick={() => window.location.reload()}
              />
            )}
            {!isError &&
              list.map((l) => (
                <li key={l.id} className='app__list__item'>
                  <img className='avatar' src={l.pfp} alt={l.name} loading='lazy' />
                  <div>
                    <b>{l.username}</b>
                    <p className='font__color__light'>{l.name}</p>
                  </div>
                </li>
              ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default ListModal;
