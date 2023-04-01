import '../../scss/Modals/listModal.scss';
import '../../scss/StatusIndicator/listItemLoading.scss';

function ListItemLoading() {
  return (
    <>
      <div className='app__list__item'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__item'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__item'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
    </>
  );
}

export default ListItemLoading;
