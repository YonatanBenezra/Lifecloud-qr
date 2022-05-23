import React from 'react'
import Shop from './Shop'
import MobileShop from './MobileShop'
import "./shop.css";
export default function MainShop() {
	return (
		<div>
	    <div className="desktop"><Shop/></div>
	    <div className="mobile"><MobileShop/></div>
			
		</div>
	)
}