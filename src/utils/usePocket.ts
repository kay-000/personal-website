import { useEffect, useState } from 'react';

/* True on phone-width screens, where KaylaOS switches to its
   Pocket layout: one full-screen app at a time, bar on top. */
const QUERY = '(max-width: 640px)';

export const usePocket = () => {
  const [pocket, setPocket] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setPocket(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return pocket;
};
