import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import './styles.css';

export default function Drag({ object, onClick, initialPosition }) {
  const [{ x, y }, api] = useSpring(() => ({
    x: initialPosition.x,
    y: initialPosition.y,
  }));

  const bindDrag = useDrag(({ offset, down }) => {
    api.start({
      x: down ? offset[0] : initialPosition.x,
      y: down ? offset[1] : initialPosition.y,
    });
  });

  const handleClick = async () => {
    onClick(object);
  };

  return (
    <div className='object-div'>
      <animated.div
        style={{ x, y, touchAction: 'none' }}
        {...bindDrag()}
        className='object'
        onClick={handleClick}
      >
        {object}
      </animated.div>
    </div>
  );
}

Drag.propTypes = {
  object: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
