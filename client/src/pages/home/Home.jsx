import React from 'react';
import { useSearch } from '../../context/SearchContext';
import './home.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';
const Home = () => {
  const { user } = useContext(AuthContext);
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    lazyLoad: true,
    speed: 750,
    slidesToShow: 1,
    initialSlide: 2,
    fontSize: '1.5em',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    lazyLoad: true,
    speed: 750,
    slidesToShow: 1,
    initialSlide: 2,
    fontSize: '1.5em',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { searchText, setSearchText } = useSearch();
  return (
    <div>

    <div style={{ cursor: 'default' }} className="desktop">
      <HomeDesktop user={user} testimonialSettings={testimonialSettings} settings={settings} searchText={searchText} searchText={setSearchText} />
    </div>


<div style={{ cursor: 'default' }} className="mobile">
<HomeMobile  user={user} testimonialSettings={testimonialSettings} settings={settings} searchText={searchText} searchText={setSearchText} />
</div>
</div>

  );
};

export default Home;
