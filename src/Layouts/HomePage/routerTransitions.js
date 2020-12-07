import { spring } from 'react-router-transition';

// wrap the `spring` helper to use a bouncy config
const bounce = (val) => {
  return spring(val, {
    stiffness: 70,
    damping: 22,
  });
};
const zoom = (val) => {
  return spring(val, {
    stiffness: 200,
    damping: 22,
  });
};
// child matches will...

const glide = (val) => {
  return spring(val, {
    stiffness: 174,
    damping: 19,
  });
};

export const bounceIn = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
};
export const slideSide = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `translateX(${styles.offset}px)`,
  };
};
export const slideUp = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `translateY(${styles.offset}px)`,
  };
};

export const slideUpTrans = {
  atEnter: {
    opacity: 0,
    offset: -100,
  },
  atLeave: {
    opacity: 0,
    offset: zoom(10),
  },
  atActive: {
    opacity: 1,
    offset: zoom(0),
  },
};
export const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    // opacity: bounce(0),
    // scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};
export const slideSideTransition = {
  atEnter: {
    offset: 12,
    opacity: 0,
  },
  atLeave: {
    offset: glide(-6),
    opacity: glide(0),
  },
  atActive: {
    offset: glide(0),
    opacity: glide(1),
  },
};
