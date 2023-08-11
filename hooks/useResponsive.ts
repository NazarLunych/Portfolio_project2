import {config} from '../config/config';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import useEventListener from '@use-it/event-listener';
import debounce from 'debounce';

type State = {
  defaultState?: {
    isDesktop?: boolean;
    isTablet?: boolean;
    isPhone?: boolean;
    xl?: boolean;
  };
};

export default function useResponsive(data?: State) {
  // created a hook to track screen size for easier interaction with js code
  const [state, setState] = useState({
    isDesktop: true,
    isTablet: false,
    isPhone: false,
    xl: false,
    ...(data?.defaultState ?? {}),
  });

  const checkWindow = useCallback(() => {
    const width = window.innerWidth;

    setState({
      isDesktop: width > config.breakpoints.lg,
      isTablet: width > config.breakpoints.sm && width < config.breakpoints.lg,
      isPhone: width < config.breakpoints.sm,
      xl: width > config.breakpoints.xl,
    });
  }, []);

  const checkWindowDebounce = useMemo(() => debounce(checkWindow, 100), [checkWindow]); // <------- I use debounce to reduce the frequency of function calls

  useEventListener('resize', checkWindowDebounce);

  useLayoutEffect(() => {
    checkWindow();
  }, [checkWindow]); // <--------- using useLayoutEffect instead of useEffect will help to trigger checkWindow directly after rendering the DOM

  return state;
}
