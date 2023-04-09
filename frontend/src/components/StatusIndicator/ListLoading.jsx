import '../../scss/StatusIndicator/listLoading.scss';
import '../../scss/Sidebar/notificationSection.scss';

function ListLoading() {
  return (
    <div className='app__notification__section'>
      <div className='app__list__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__list__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
    </div>
  );
}

export default ListLoading;
