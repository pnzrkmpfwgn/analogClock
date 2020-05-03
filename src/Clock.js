import React, {Fragment, useState, useEffect} from 'react';
import clock from './Assets/clock.png';
import hand from './Assets/hand1.png';
import hand2 from './Assets/hand2.png';
import needle from './Assets/needle.png';
import classes from './clock.module.css';
import useSetInterval from './useSetInterval';

import {useSpring, animated} from 'react-spring';

function Clock() {
  const date = new Date();
  const [degreeNeedle, setDegreeNeedle] = useState(0);
  const [degreeHand1, setDegreeHand1] = useState(0);
  const [degreeHand2, setDegreeHand2] = useState(0);

  useEffect(() => {
    setDegreeNeedle((d) => {
      d = date.getSeconds() * 6;
      return d;
    });
    setDegreeHand1((d) => {
      d = date.getMinutes() * 6;
      return d;
    });
    setDegreeHand2((d) => {
      d = 0.5 * (60 * date.getHours() + date.getMinutes());
      return d;
    });
  }, []);

  useSetInterval(() => {
    console.log(degreeHand2);
    setDegreeNeedle((d) => d + 6);
    setDegreeHand1((d) => {
      if (date.getSeconds() === 59) {
        d = d + 6;
      }
      return d;
    });
    setDegreeHand2((d) => {
      if (date.getSeconds() === 59) {
        d = d + 0.5;
      }
      return d;
    });
  }, 1000);
  const animNeedle = useSpring({
    from: {transform: `rotate(${0}deg)`},
    to: {
      transform: `rotate(${degreeNeedle}deg)`,
    },
  });
  const animHand1 = useSpring({
    from: {transform: `rotate(${0}deg)`},
    to: {transform: `rotate(${degreeHand1}deg)`},
  });
  const animHand2 = useSpring({
    from: {transform: `rotate(${0}deg)`},
    to: {transform: `rotate(${degreeHand2}deg)`},
  });
  return (
    <Fragment>
      <div className={classes.clock}>
        <img src={clock} height='500px' width='500px' alt='clock' />
      </div>
      <animated.div className={classes.hand1}>
        <animated.img style={animHand1} src={hand} alt='Hand'></animated.img>
      </animated.div>
      <animated.div className={classes.hand2}>
        <animated.img style={animHand2} src={hand2} alt='hand2' />
      </animated.div>
      <animated.div className={classes.needle}>
        {' '}
        <animated.img style={animNeedle} src={needle} alt='needle' />{' '}
      </animated.div>
    </Fragment>
  );
}

export default Clock;
