import { motion } from 'framer-motion';
import '../../scss/Modals/sidebar.scss';

const variants = {
  open: { x: '0%' },
  closed: { x: '-125%' },
};

function Sidebar({ isOpen, close }) {
  return (
    <motion.div
      id='app__sidebar__wrapper'
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.7, type: 'spring' }}
      onClick={close}>
      <motion.div id='app__sidebar' />
    </motion.div>
  );
}

export default Sidebar;
