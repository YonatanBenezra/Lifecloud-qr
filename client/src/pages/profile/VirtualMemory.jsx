import React, { useEffect, useRef, useState } from 'react';
import './virtualMemory.css';

// IMAGEs
import spiral from '../../assets/spiral.png';
import arrowUpImg from '../../assets/arrow-up.png';
import arrowDownImg from '../../assets/arrow-down.png';

let items = null;

export default function VirtualMemory({ candleFlower, coverImg }) {
  const memorialWrapper = useRef(null);
  const memorial = useRef(null);
  const arrowUp = useRef(null);
  const arrowDown = useRef(null);

  const getGroups = () => {
    const groups = [];
    let group = [];
    let limit = 28;

    candleFlower.forEach((item, index) => {
      if (limit < index + 1) {
        limit += 29;
        groups.push(group);
        group = [];
      } else {
        group.push(item);
      }
    });

    if (group) groups.push(group);
    return groups;
  };

  const scaleItems = () => {
    const top = memorial.current.getBoundingClientRect().top;
    const bottom = memorial.current.getBoundingClientRect().bottom;
    console.log(memorial.current.offsetTop);
    if (top < 50) {
      arrowUp.current.style.opacity = '1';
    } else {
      arrowUp.current.style.opacity = '0';
    }
    if (bottom > 1000) {
      arrowDown.current.style.opacity = '1';
    } else {
      arrowDown.current.style.opacity = '0';
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
  };

  const setMemorialHeight = () => {
    const lastImage = items[items.length - 1];
    console.log(lastImage);

    if (!lastImage) return;
    memorial.current.style.height = lastImage.offsetTop + 200 + 'px';
  };

  useEffect(() => {
    items = document.querySelectorAll('.temporary figure');
    scaleItems();

    setMemorialHeight();
    memorialWrapper.current.addEventListener('scroll', scaleItems);
  }, [candleFlower]);

  return (
    <section className="temporary">
      <div className="shape shape-top"></div>
      <div className="shape shape-bottom"></div>
      <div className="background">
        <img src={coverImg} alt="coverImg" />
      </div>
      <img
        ref={arrowUp}
        className="arrow arrow-up"
        src={arrowUpImg}
        alt="arrow-up"
      />
      <img
        ref={arrowDown}
        className="arrow arrow-down"
        src={arrowDownImg}
        alt="arrow-down"
      />
      <div className="wrapper" ref={memorialWrapper}>
        <div className="memorial" ref={memorial}>
          {!candleFlower || !candleFlower.length
            ? 'loading...'
            : getGroups().map((cf, index) => {
                return (
                  <div key={index} className="layers-group">
                    <img
                      className="spiral spiral-top-left"
                      src={spiral}
                      alt="spiral"
                    />
                    <img
                      className="spiral spiral-top-right"
                      src={spiral}
                      alt="spiral"
                    />
                    <img
                      className="spiral spiral-bottom-left"
                      src={spiral}
                      alt="spiral"
                    />
                    <img
                      className="spiral spiral-bottom-right"
                      src={spiral}
                      alt="spiral"
                    />
                    {cf.map((figure, index) => {
                      return (
                        <figure
                          key={index}
                          data-scale="small"
                          className={`position-${index + 1}`}
                        >
                          <img
                            className="img-lg"
                            src={figure.type}
                            alt="figure.type"
                          />
                          <figcaption>
                            <span className="comment"> {figure.username} </span>
                            <img
                              className="img-sm"
                              src={figure.userImg}
                              alt={figure.username}
                            />
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
