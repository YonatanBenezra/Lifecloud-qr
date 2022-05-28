import React, { useEffect } from 'react';
import DesktopTopbar from './DesktopTopbar';
import MobileTopbar from './MobileTopbar';

const Topbar = () => {
  const [screenWidth, setScreenWidthWidth] = React.useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidthWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setScreenWidthWidth(window.innerWidth);
      });
    };
  }, []);
  return (
    <React.Fragment>
      {screenWidth >= 768 ? <DesktopTopbar /> : <MobileTopbar />}
    </React.Fragment>
  );
};

export default Topbar;
