import React, { useReducer, useRef, useState } from 'react';
import lightCandle from '../../assets/light_candle.png';
import darkCandle from '../../assets/dark_candle.png';
import lightFlower from '../../assets/light_flower.png';
import darkFlower from '../../assets/dark_flower.png';
import candle from '../../assets/candle.png';
import flower from '../../assets/flower.png';
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';
const initialState = {
  candle: 0,
  flower: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_FLOWER':
      return {
        ...state,
        flower: state.flower + 1,
      };
    case 'DECREASE_FLOWER':
      return {
        ...state,
        flower: state.flower > 0 ? state.flower - 1 : 0,
      };
    case 'INCREASE_CANDLE':
      return {
        ...state,
        candle: state.candle + 1,
      };
    case 'DECREASE_CANDLE':
      return {
        ...state,
        candle: state.candle > 0 ? state.candle - 1 : 0,
      };
    case 'RESET_FLOWER':
      return {
        ...state,
        flower: 0,
      };
    case 'RESET_CANDLE':
      return {
        ...state,
        candle: 0,
      };
    case 'RESET':
      return {
        flower: 0,
        candle: 0,
      };

    default:
      return state;
  }
};

const CandleFlower = ({ profileId, userId }) => {
  const history = useHistory();
  const candleRef = useRef();
  const [candleFlowerState, dispatch] = useReducer(reducer, initialState);
  const [candleFlower, setCandleFlower] = useState([]);
  const totalCandles = candleFlower.reduce((acc, curr) => acc + curr.candle, 0);
  const totalFlowers = candleFlower.reduce((acc, curr) => acc + curr.flower, 0);
  const [showCandleList, setShowCandleList] = useState(false);
  const [showFlowerList, setShowFlowerList] = useState(false);

  const getAllCandleFlower = useCallback(async () => {
    const allCandleFlower = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/candleFlower/${profileId}`
    );
    setCandleFlower(allCandleFlower.data);
  }, [profileId]);

  useEffect(() => {
    getAllCandleFlower();
  }, [getAllCandleFlower]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    window.location.assign(
      `https://direct.tranzila.com/icloud/iframenew.php?sum=${
        (candleFlowerState.flower + candleFlowerState.candle) * 5
      }`
    );

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/candleFlower`, {
        flower: candleFlowerState.flower,
        candle: candleFlowerState.candle,
        profile: profileId,
        user: userId,
      });
      getAllCandleFlower();
      dispatch({ type: 'RESET' });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      candleRef?.current?.click();
    }, 30000);
    return () => clearTimeout(myTimeout);
  }, []);
  return (
    <React.Fragment>
      <div
        className="modal fade qr-modal"
        id="candleFlower"
        tabIndex="-1"
        aria-labelledby="candleFlowerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-align-center"
                id="candleFlowerLabel"
              >
                להדליק נר או להניח זר
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center pt-0">
              <div className="row">
                <div className="col-6 p-0">
                  <img className="img-fluid" src={candle} alt="FlowerLight" />

                  <button
                    className="profile-small-btn border-0"
                    style={{ transform: 'translateY(-50px)' }}
                    onClick={() => dispatch({ type: 'INCREASE_CANDLE' })}
                  >
                    קניית נר
                  </button>
                </div>
                <div className=" col-6 p-0">
                  <img className="img-fluid" src={flower} alt="FlowerLight" />

                  <button
                    className="profile-small-btn border-0"
                    style={{ transform: 'translateY(-50px)' }}
                    onClick={() => dispatch({ type: 'INCREASE_FLOWER' })}
                  >
                    קניית פרח
                  </button>
                </div>
              </div>

              {(candleFlowerState.candle > 0 ||
                candleFlowerState.flower > 0) && (
                <form className="container" onSubmit={handleFormSubmit}>
                  <h4 className="fw-bold mb-3">מוצרים</h4>
                  {candleFlowerState.candle > 0 && (
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex justify-content-between text-white align-items-center px-3 rounded-3 w-100 mb-3"
                        style={{ backgroundColor: '#6097bf' }}
                      >
                        <div style={{ fontSize: 30 }}>
                          <span
                            className="fw-bold pointer"
                            onClick={() =>
                              dispatch({ type: 'INCREASE_CANDLE' })
                            }
                          >
                            +
                          </span>
                          <span className="mx-2 fw-bold">
                            {candleFlowerState.candle}
                          </span>
                          <span
                            className="fw-bold pointer"
                            onClick={() =>
                              dispatch({ type: 'DECREASE_CANDLE' })
                            }
                          >
                            -
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white m-0">נר</h5>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => dispatch({ type: 'RESET_CANDLE' })}
                      ></button>
                    </div>
                  )}
                  {candleFlowerState.flower > 0 && (
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex justify-content-between text-white align-items-center px-3 rounded-3 w-100"
                        style={{ backgroundColor: '#6097bf' }}
                      >
                        <div style={{ fontSize: 30 }}>
                          <span
                            className="fw-bold pointer"
                            onClick={() =>
                              dispatch({ type: 'INCREASE_FLOWER' })
                            }
                          >
                            +
                          </span>
                          <span className="mx-2 fw-bold">
                            {candleFlowerState.flower}
                          </span>
                          <span
                            className="fw-bold pointer"
                            onClick={() =>
                              dispatch({ type: 'DECREASE_FLOWER' })
                            }
                          >
                            -
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white m-0">פרח</h5>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => dispatch({ type: 'RESET_FLOWER' })}
                      ></button>
                    </div>
                  )}
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className={`border-0 w-50 mt-4 py-2 fw-bold text-white rounded-3 `}
                    style={{ backgroundColor: '#6097bf', fontSize: '20px' }}
                    type="submit"
                  >
                    המשך
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column position-fixed candle_flower">
        <div className="candle_flower_item">
          <div
            className="candle_flower_count pointer"
            onClick={() => setShowCandleList((prev) => !prev)}
          >
            {totalCandles}
          </div>
          <LazyLoad>
            <img
              data-bs-toggle="modal"
              data-bs-target="#candleFlower"
              src={totalCandles > 0 ? lightCandle : darkCandle}
              alt="light candle"
              ref={candleRef}
              className="mb-4"
            />
          </LazyLoad>

          {showCandleList && totalCandles > 0 && (
            <div className="candle_flower_user_list">
              <ul>
                {candleFlower
                  .filter((cf) => cf.candle > 0)
                  .map((cf) => (
                    <li>
                      ה/הדליק {cf.user.firstName} <br />
                      {cf.candle} נרות
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div className="candle_flower_item">
          <div
            className="candle_flower_count pointer"
            onClick={() => setShowFlowerList((prev) => !prev)}
          >
            {totalFlowers}
          </div>
          <LazyLoad>
            <img
              data-bs-toggle="modal"
              data-bs-target="#candleFlower"
              src={totalFlowers > 0 ? lightFlower : darkFlower}
              alt="light flower"
            />
          </LazyLoad>

          {showFlowerList && totalFlowers > 0 && (
            <div className="candle_flower_user_list ">
              <ul>
                {candleFlower
                  .filter((cf) => cf.flower > 0)
                  .map((cf) => (
                    <li>
                      הניח/ה {cf.user.firstName} <br />
                      {cf.flower} פרחים
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CandleFlower;
