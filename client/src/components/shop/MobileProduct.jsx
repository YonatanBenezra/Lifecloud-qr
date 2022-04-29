import {React, useState} from 'react'
import './product.css'
import arrowUp from '../../assets/Arrow_up.png'
import arrowDown from '../../assets/Arrow_down.png'
import SubmitBtn from '../submitBtn/SubmitBtn'

const Product = ({product, name, hebName, priceRange, text, img, options, submit, setSelectedQuantity, setSubmitedOption, setSubmitedSubOption}) => {

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(options && options[0])
  const [selectedSubOption, setSelectedSubOption] = useState(selectedOption.subOptions && selectedOption.subOptions[0])

  const addQuantity = () => setQuantity(quantity + 1)
  const reduceQuantity = () => {quantity > 1 && setQuantity(quantity - 1)}

  const onSubmit = () => {
    setSelectedQuantity(quantity)
    // setSubmitedOption(selectedOption)
    // selectedSubOption && setSubmitedSubOption(selectedSubOption)
    submit(product, selectedOption, selectedSubOption)
  }

  //console.log('options[0]', options[0])
  //console.log('selectedOption', selectedOption)
  //console.log('???', selectedOption.optName === selectedOption.optName)

  const selectOption = (opt) => {
    setSelectedOption(opt)
    opt.subOptions ? setSelectedSubOption(opt.subOptions[0]) : setSelectedSubOption(null)
    
  }
  const selectSubOption = (subOpt) => {
    setSelectedSubOption(subOpt)
  }

  return (
    <div className='Mproduct-main szTxt'>
        <div className='Mimage-container szTxt' 
             style={{backgroundImage: `url(${img})`}}>
        </div>
        {
          options && (
            <div>
              <div className='Msubtitle ff szTxt'>
                :אופציות נוספות
              </div>
              <div className='Moptions-row szTxt'>
                {options.map((opt, i) => (
                  <div className={'Moption szTxt' + (opt.optName === selectedOption.optName ? 'szTxt Mselected' : '')}
                        key={i}
                        style={{backgroundImage: `url(${opt.img})`,height:"100px",width:"100px"}}
                        onClick={() => selectOption(opt)}
                      />
                ))}
              </div>
              {
                selectedOption.subOptions && (
                  <div>
                    <div className='Msubtitle szTxt'>
                      {selectedOption.subOptionsTitle}
                    </div>
                    <div className='Moptions-row szTxt'>
                      {selectedOption.subOptions.map((subOpt, i) => (
                        <div className={'Moption szTxt ' + (subOpt.optName === selectedSubOption.optName ? 'Mselected szTxt' : '')}
                              key={i}
                              style={{backgroundImage: `url(${subOpt.img})`,height:"100px",width:"100px"}}
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
        <div className='Mheader-line szTxt ff'>      
            <div className='Mprice ff szTxt'>{priceRange} ש״ח</div>
            <div className='Mseparator ff szTxt'>|</div>
            <div className='Mtitle ff'>{hebName || name}</div>
        </div>
        <div className='Mtext ff' style={{fontSize:"28px"}}>{text}</div>
        <div className='Mheader-line'>                        
            <div className='Mtitle ff szTxt'>{selectedSubOption ? selectedSubOption.optName : selectedOption.optName}</div>
        </div>
        <div className='Mheader-line szTxt'>                        
            <div className='Mtitle ff szTxt'>{selectedSubOption ? selectedSubOption.price : selectedOption.price} ש״ח</div>
        </div>
        <div className='Mquantity-line ff szTxt'>
            <div className='Mquantity-button szTxt' 
                 style={{backgroundImage: `url(${arrowUp})`}}
                 onClick={addQuantity}/>
            <div className='Mquantity-num' >{quantity}</div>
            <div className='Mquantity-button szTxt' 
                 style={{backgroundImage: `url(${arrowDown})`}}
                 onClick={reduceQuantity}/>
            <div className='Mquantity-text szTxt ff'>כמות:</div>            
        </div>
        <div className='Msubmit-container' style={{padding:"10px"}}>
          <SubmitBtn text='רכישה' onSubmit={onSubmit}/>
        </div>
        
    </div>
  );
};

export default Product; 