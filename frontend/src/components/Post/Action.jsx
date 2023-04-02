import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import LoadingIcon from '../StatusIndicator/LoadingIcon';
import '../../scss/Post/action.scss';

function Action({ icon, text, onClick, isLoading, isError }) {
  return (
    <span role='button' className='app__action' onClick={onClick}>
      <span>
        {icon}
        {text}
      </span>
      {isLoading && <LoadingIcon />}
      {isError && (
        <>
          <ExclamationCircleIcon
            data-tooltip-id='action-error-tooltip'
            data-tooltip-html='Oops! An Error Occurred. <br> Try Again Later.'
          />
          <Tooltip id='action-error-tooltip' place='bottom' />
        </>
      )}
    </span>
  );
}

export default Action;
