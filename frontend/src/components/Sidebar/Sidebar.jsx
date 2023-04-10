import { motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import '../../scss/Sidebar/sidebar.scss';

function Sidebar({ children, close }) {
  const isMobile = useMediaQuery('(max-width: 480px)');

  const variants = isMobile
    ? {
        open: { y: '0%' },
        closed: { y: '100%' },
      }
    : {
        open: { x: '0%' },
        closed: { x: '-125%' },
      };

  /**
   * Need to set the key to isMobile so when the media query is
   * true the div will be re-rendered. The div is already rendered
   * so the animations can't just change
   */
  return (
    <motion.div key={isMobile} id='app__sidebar__wrapper' onClick={close}>
      <motion.div
        id='app__sidebar'
        initial='closed'
        animate='open'
        variants={variants}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;
