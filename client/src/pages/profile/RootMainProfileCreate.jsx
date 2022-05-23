import React from 'react'
import MainProfileCreate from './MainProfileCreate'
import MobileMainProfileCreate from './MobileMainProfileCreate'
import "./profile.css";
export default function MainMainProfileCreate() {
	return (
		<div>
	    <div className="desktop"><MainProfileCreate/></div>
	    <div className="mobile"><MobileMainProfileCreate/></div>
			
		</div>
	)
}