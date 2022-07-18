import React, { useEffect } from 'react';
import './virtualMemory.css';
import arrowDown from '../../assets/arrow-down.png';
import arrowUp from '../../assets/arrow-up.png';

const VirtualMemory = ({ candleFlower, coverImg }) => {
  useEffect(() => {
    (function () {
      const scrollWrapper = document.querySelector('.temporary > .wrapper');
      const scrollWrapperInner = document.querySelector(
        '.temporary > .wrapper .memorial'
      );
      const items = document.querySelectorAll('.temporary figure');
      const arrowUp = document.querySelector('.temporary .arrow-up');
      const arrowDown = document.querySelector('.temporary .arrow-down');

      scrollWrapper.addEventListener('scroll', () => {
        const top = scrollWrapperInner.getBoundingClientRect().top;
        const bottom = scrollWrapperInner.getBoundingClientRect().bottom;
        if (top < 50) {
          arrowUp.style.opacity = '1';
        } else {
          arrowUp.style.opacity = '0';
        }
        if (bottom > 1000) {
          arrowDown.style.opacity = '1';
        } else {
          arrowDown.style.opacity = '0';
        }

        items.forEach((item) => {
          const size = (item.getBoundingClientRect().top / 100).toFixed();
          if (size < 2) {
            item.dataset.scale = 'small';
          } else if (size < 4) {
            item.dataset.scale = 'large';
          } else if (size < 5) {
            item.dataset.scale = '';
          } else if (size < 8) {
            item.dataset.scale = 'large';
          } else {
            item.dataset.scale = 'small';
          }
        });
      });
    })();
  }, [candleFlower]);

  let number = 0;
  return (
    <section className="temporary">
      <div className="shape shape-top" />
      <div className="shape shape-bottom" />
      <div className="background">
        <img src={coverImg} alt="" />
      </div>
      <img className="arrow arrow-up" src={arrowUp} alt="" />
      <img className="arrow arrow-down" src={arrowDown} alt="" />
      <div className="wrapper">
        <div className="memorial">
          {candleFlower.map((cf, index) => {
            number++;
            if (number === 13) number = 1;
            return (
              <figure
                data-scale="small"
                className={
                  Math.trunc(index / 12) % 2 === 0
                    ? `position-${number}`
                    : `position-second-${number}`
                }
              >
                <img className="img-lg" src={cf.type} alt="candles" />
                <figcaption>
                  <span className="comment"> {cf.username} </span>
                  <img className="img-sm" src={cf.userImg} alt={cf.username} />
                </figcaption>
              </figure>
            );
          })}
          {/* <img id="wave-1" src={wave} alt="" className="wave wave-left" />
          <img id="wave-2" src={wave} alt="" className="wave wave-right" />
          <figure data-scale="small" className="position-1 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-2 scale-sm">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor samet </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-3 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-4">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-5">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-6 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-7 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-8 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-9">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-10">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-11">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-12">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <img
            id="wave-3"
            src={wave}
            alt=""
            className="wave wave-row-2 wave-left"
          />
          <img
            id="wave-4"
            src={wave}
            alt=""
            className="wave wave-row-2 wave-right"
          />
          <figure data-scale="small" className="position-second-1 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-2 scale-sm">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor samet </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-3 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-4">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-5">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-6 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-7 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-8 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-9">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-10">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-11">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-second-12">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <img
            id="wave-5"
            src={wave}
            alt=""
            className="wave wave-row-3 wave-left"
          />
          <img
            id="wave-6"
            src={wave}
            alt=""
            className="wave wave-row-3 wave-right"
          />
          <figure data-scale="small" className="position-1 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-2 scale-sm">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor samet </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-3 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-4">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-5">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-6 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-7 scale-md">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-8 scale-sm">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-9">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum </span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-10">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-11">
            <img className="img-lg" src={rose} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <figure data-scale="small" className="position-12">
            <img className="img-lg" src={candles} alt="" />
            <figcaption>
              <span className="comment"> lorem ipsum dolor</span>
              <img className="img-sm" src={commenter} alt="" />
            </figcaption>
          </figure>
          <img
            id="wave-7"
            src={wave}
            alt=""
            className="wave wave-row-4 wave-left display-none-sm"
          />
          <img
            id="wave-8"
            src={wave}
            alt=""
            className="wave wave-row-4 wave-right display-none-sm"
          />
          <img
            id="wave-9"
            src={wave}
            alt=""
            className="wave wave-row-5 wave-left display-none-sm"
          />
          <img
            id="wave-10"
            src={wave}
            alt=""
            className="wave wave-row-5 wave-right display-none-sm"
          />
          <img
            id="wave-11"
            src={wave}
            alt=""
            className="wave wave-row-6 wave-left display-none-sm"
          />
          <img
            id="wave-12"
            src={wave}
            alt=""
            className="wave wave-row-6 wave-right display-none-sm"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default VirtualMemory;
