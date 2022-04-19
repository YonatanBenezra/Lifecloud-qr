import React from 'react'
import Policy from './Policy'
import MobilePolicy from './MobilePolicy'
import "./policy.css";
export default function MainPolicy() {
	return (
		<div>
	    <div className="desktop"><Policy/></div>
	    <div className="mobile"><MobilePolicy/></div>
			
		</div>
	)
}