export default {
    appTitleAnimation: {
      from: { opacity: 0, transform: 'translateY(-100px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { duration: 800 }
    },
    loginFormAnimation: {
      from: { opacity: 0, transform: 'translateY(100px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 800 }
    },

    fadeInAnimation: {
      from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 120, friction: 14, duration: 300 },
    },

    profilePageAnimation: {
      from: { opacity: 0, transform: 'translateX(100px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        config: { duration: 300 }
    }
  };
