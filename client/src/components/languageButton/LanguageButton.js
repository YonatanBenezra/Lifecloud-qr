import React, { useState, useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'
import US from '../../assets/US.png'
import Israel from '../../assets/Israel.png'

const LanguageButton = () => {
    const { language, setLanguage } = useContext(LanguageContext)
    return (
        <span>
            <img alt='' src={Israel} onClick={() => [setLanguage('heb'), localStorage.setItem('lang', 'heb')]} style={{ height: '15px', width: '15px', marginRight: '10px', cursor: 'pointer' }}></img>
            <img alt='' src={US} onClick={() => [setLanguage('EN'), localStorage.setItem('lang', 'EN')]} style={{ height: '15px', width: '15px', cursor: 'pointer' }}></img>
        </span>
    )
}
export default LanguageButton