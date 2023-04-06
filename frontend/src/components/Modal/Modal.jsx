import { motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import '../../scss/Modals/modal.scss';

function Modal({ children, close }) {
  const isMobile = useMediaQuery('(max-width: 480px)');

  const variants = isMobile
    ? {
        open: { y: '0%' },
        closed: { y: '100%' },
      }
    : {
        open: {
          y: '0%',
          opacity: 1,
        },
        closed: { y: '100%', opacity: 0 },
      };

  return (
    <div key={isMobile} role='dialog' id='modal' onClick={() => close()}>
      <motion.main
        className='modal__content__wrapper'
        initial='closed'
        animate='open'
        variants={variants}
        onClick={(e) => e.stopPropagation()}>
        <div className='modal__content'>{children}</div>
      </motion.main>
    </div>
  );
}

export default Modal;
