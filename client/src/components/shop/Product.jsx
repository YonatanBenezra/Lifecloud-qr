import {React, useState} from 'react'
import './product.css'
import arrowUp from '../../assets/Arrow_up.png'
import arrowDown from '../../assets/Arrow_down.png'
import SubmitBtn from '../submitBtn/SubmitBtn'

const Product = ({name, hebName, priceRange, text, img, options, submit, setSelectedQuantity}) => {

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(options && options[0])
  const [selectedSubOption, setSelectedSubOption] = useState(selectedOption.subOptions && selectedOption.subOptions[0])

  const addQuantity = () => setQuantity(quantity + 1)
  const reduceQuantity = () => {quantity > 1 && setQuantity(quantity - 1)}

  const onSubmit = () => {
    setSelectedQuantity(quantity)
    submit()
  }

  //console.log('options[0]', options[0])
  console.log('selectedOption', selectedOption)
  //console.log('???', selectedOption.optName === selectedOption.optName)

  const selectOption = (opt) => {
    setSelectedOption(opt)
    opt.subOptions ? setSelectedSubOption(opt.subOptions[0]) : setSelectedSubOption(null)
    
  }
  const selectSubOption = (subOpt) => {
    setSelectedSubOption(subOpt)
  }

  return (
    <div className='product-main'>
        <div className='image-container' 
             style={{backgroundImage: `url(${img})`}}>
        </div>
        {
          options && (
            <div>
              <div className='subtitle'>
                :אופציות נוספות
              </div>
              <div className='options-row'>
                {options.map((opt, i) => (
                  <div className={'option ' + (opt.optName === selectedOption.optName ? 'selected' : '')}
                        key={i}
                        style={{backgroundImage: `url(${opt.img})`}}
                        onClick={() => selectOption(opt)}
                      />
                ))}
              </div>
              {
                selectedOption.subOptions && (
                  <div>
                    <div className='subtitle'>
                      {selectedOption.subOptionsTitle}
                    </div>
                    <div className='options-row'>
                      {selectedOption.subOptions.map((subOpt, i) => (
                        <div className={'option ' + (subOpt.optName === selectedSubOption.optName ? 'selected' : '')}
                              key={i}
                              style={{backgroundImage: `url(${subOpt.img})`}}
                              onClick={() => selectSubOption(subOpt)}
                        />                      
                      ))}
                    </div>
                  </div>
                  
                )
              }
            </div>  
          )
          
        }
        <div className='header-line'>      
            <div className='price'>{priceRange} ש״ח</div>
            <div className='separator'>|</div>
            <div className='title'>{hebName || name}</div>
        </div>
        <div className='text'>{text}</div>
        <div className='header-line'>                        
            <div className='title'>{selectedSubOption ? selectedSubOption.optName : selectedOption.optName}</div>
        </div>
        <div className='header-line'>                        
            <div className='title'>{selectedSubOption ? selectedSubOption.price : selectedOption.price} ש״ח</div>
        </div>
        <div className='quantity-line'>
            <div className='quantity-button' 
                 style={{backgroundImage: `url(${arrowUp})`}}
                 onClick={addQuantity}/>
            <div className='quantity-num' >{quantity}</div>
            <div className='quantity-button' 
                 style={{backgroundImage: `url(${arrowDown})`}}
                 onClick={reduceQuantity}/>
            <div className='quantity-text'>כמות:</div>            
        </div>
        <div className='submit-container'>
          <SubmitBtn text='רכישה' onSubmit={onSubmit}/>
        </div>
        
    </div>
  );
};

export default Product; 