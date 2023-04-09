import { useNavigate } from 'react-router-dom';
import '../../scss/Modals/listModal.scss';
import AppError from '../StatusIndicator/AppError';
import Modal from './Modal';
import User from '../User';

//TODO: LOADING?
// CENTER ERROR
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
            {!isError && list.map((u) => <User key={u.id} user={u} handleClose={() => close()} />)}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default ListModal;
