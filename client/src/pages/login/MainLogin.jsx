import React from 'react'
import Login from './Login'
import MobileLogin from './MobileLogin'
import "./login.css";
export default function MainLogin() {
	return (
		<div>
	    <div className="desktop"><Login/></div>
	    <div className="mobile"><MobileLogin/></div>
			
		</div>
	)
}