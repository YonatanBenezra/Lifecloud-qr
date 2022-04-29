import React from 'react'
import Contact from './Contact'
import MobileContact from './MobileContact'
import "./contact.css";
export default function MainContact() {
	return (
		<div>
	    <div className="desktop"><Contact/></div>
	    <div className="mobile"><MobileContact/></div>
			
		</div>
	)
}