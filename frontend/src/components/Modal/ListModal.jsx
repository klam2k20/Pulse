import Modal from './Modal';
import '../../scss/Modals/listModal.scss';

function ListModal({ list, title, isOpen, close, isLoading }) {
  return (
    <>
      {isOpen && (
        <Modal close={close}>
          {isLoading && <span>Loading....</span>}
          {!isLoading && (
            <>
              <header className='app__list__header'>
                <h4>{title}</h4>
              </header>
              <ul className='app__list'>
                {list.map((l) => (
                  <li className='app__list__item'>
                    <img className='avatar' src={l.pfp} alt={l.name} loading='lazy' />
                    <div>
                      <b>{l.username}</b>
                      <p className='font__color__light'>{l.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default ListModal;