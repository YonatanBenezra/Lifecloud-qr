import React from 'react'
import ProfileCreate from './ProfileCreate'
import MobileProfileCreate from './MobileProfileCreate'
import "./profile.css";
export default function MainProfileCreate() {
	return (
		<div>
	    <div className="desktop"><ProfileCreate/></div>
	    <div className="mobile"><MobileProfileCreate/></div>
			
		</div>
	)
}