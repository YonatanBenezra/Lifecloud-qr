import React from 'react'
import Register from './Register'
import MobileRegister from './MobileRegister'
import "./register.css";
export default function MainRegister() {
	return (
		<div>
	    <div className="desktop"><Register/></div>
	    <div className="mobile"><MobileRegister/></div>
			
		</div>
	)
}