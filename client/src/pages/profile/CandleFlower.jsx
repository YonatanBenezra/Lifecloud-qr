import React, { useReducer, useRef, useState } from 'react';
import roundCandle from '../../assets/roundCandle.png';

import roundFlower from '../../assets/roundFlower.png';

import candle from '../../assets/candle.png';
import flower from '../../assets/flower.png';
import LazyLoad from 'react-lazyload';
import { useHistory, useParams } from 'react-router-dom';
import { MethodsPayment } from '../../components/methodsPayment/methodsPayment';
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

const CandleFlower = ({
  candleFlower,
  handleFormSubmit,
  profileName,
  setIsNext,
  isNext,
  setIsPaid,
  userId,
}) => {
  const { id: profileId } = useParams();
  const history = useHistory();
  const candleRef = useRef();
  const [candleFlowerState, dispatch] = useReducer(reducer, initialState);

  const totalCandles = candleFlower.reduce((acc, curr) => acc + curr.candle, 0);
  const totalFlowers = candleFlower.reduce((acc, curr) => acc + curr.flower, 0);
  const [showCandleList, setShowCandleList] = useState(false);
  const [showFlowerList, setShowFlowerList] = useState(false);

  /* useEffect(() => {
    const myTimeout = setTimeout(() => {
      candleRef?.current?.click();
    }, 30000);
    return () => clearTimeout(myTimeout);
  }, []); */
  return (
    <React.Fragment>
      <div
        className="modal fade qr-modal"
        id="candleFlower"
        tabIndex="-1"
        aria-labelledby="candleFlowerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-align-center"
                id="candleFlowerLabel"
              >
                ???????????? ???? {profileName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center p-0 overflow-hidden profile_candle_modal">
              <div className="row">
                <div className="col-6 p-0 position-relative overflow-hidden">
                  <div className="popup-image-text">
                    <h3>???????? ???? ????????????????</h3>
                    <h6>??-72 ????????</h6>
                    <p>?????????? ???? 5 ??????</p>
                  </div>
                  <img className="img-fluid" src={candle} alt="FlowerLight" />

                  <button
                    className="profile-small-btn border-0 profile_candle_btn w-50"
                    onClick={() => dispatch({ type: 'INCREASE_CANDLE' })}
                  >
                    ???????????? ????
                  </button>
                </div>
                <div className=" col-6 p-0 position-relative overflow-hidden">
                  <div className="popup-image-text">
                    <h3>???????? ?????? ????????????????</h3>
                    <h6>??-72 ????????</h6>
                    <p>?????????? ???? 5 ??????</p>
                  </div>
                  <img className="img-fluid" src={flower} alt="FlowerLight" />

                  <button
                    className="profile-small-btn border-0 profile_candle_btn w-50"
                    onClick={() => dispatch({ type: 'INCREASE_FLOWER' })}
                  >
                    ???????????? ??????
                  </button>
                </div>
              </div>

              {(candleFlowerState.candle > 0 ||
                candleFlowerState.flower > 0) && (
                <form
                  className="container"
                  onSubmit={(e) =>
                    handleFormSubmit(e, candleFlowerState, dispatch)
                  }
                >
                  <h4 className="fw-bold mb-3">????????????</h4>
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
                          <h5 className="text-white m-0">????</h5>
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
                          <h5 className="text-white m-0">??????</h5>
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
                    // data-bs-dismiss="modal"
                    aria-label="Close"
                    className={`border-0 w-50 my-4 py-2 fw-bold text-white rounded-3 `}
                    style={{ backgroundColor: '#6097bf', fontSize: '20px' }}
                    type="button"
                    onClick={() => setIsNext(true)}
                  >
                    ????????
                  </button>
                  {isNext && (
                    <MethodsPayment
                      setIsPaid={setIsPaid}
                      isOpen={true}
                      setIsNext={setIsNext}
                      dataForPay={{
                        flower: candleFlowerState.flower,
                        candle: candleFlowerState.candle,
                        profile: profileId,
                        user: userId,
                      }}
                    />
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column position-fixed candle_flower">
        <div
          className={`candle_flower_item ${
            totalCandles > 0 ? 'with_tribute' : 'without_tribute'
          }`}
        >
          <div
            className="candle_flower_count pointer"
            onClick={() => setShowCandleList((prev) => !prev)}
          >
            {totalCandles}
          </div>
          <div
            className={`fc_image_container`}
            // data-bs-toggle="modal"
            // data-bs-target="#candleFlower"
          >
            <LazyLoad>
              <img
                src={roundCandle}
                alt="light candle"
                ref={candleRef}
                className="rounded-circle"
              />
            </LazyLoad>
            <p className="tributeText">???????? ????</p>
          </div>

          {showCandleList && totalCandles > 0 && (
            <div className="candle_flower_user_list">
              <ul>
                {candleFlower
                  .filter((cf) => cf.candle > 0)
                  .map((cf) => (
                    <li>
                      ??/?????????? {cf.user.firstName} <br />
                      {cf.candle} ????????
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className={`candle_flower_item ${
            totalFlowers > 0 ? 'with_tribute' : 'without_tribute'
          }`}
        >
          <div
            className="candle_flower_count pointer"
            onClick={() => setShowFlowerList((prev) => !prev)}
          >
            {totalFlowers}
          </div>
          <div
            className={`fc_image_container `}
            // data-bs-toggle="modal"
            // data-bs-target="#candleFlower"
          >
            <LazyLoad>
              <img
                src={roundFlower}
                alt="light flower"
                className="rounded-circle"
              />
            </LazyLoad>
            <p className="tributeText">?????? ??????</p>
          </div>

          {showFlowerList && totalFlowers > 0 && (
            <div className="candle_flower_user_list ">
              <ul>
                {candleFlower
                  .filter((cf) => cf.flower > 0)
                  .map((cf) => (
                    <li>
                      ????????/?? {cf.user.firstName} <br />
                      {cf.flower} ??????????
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
