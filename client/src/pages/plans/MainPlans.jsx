import React from 'react'
import Plans from './Plans'
import MobilePlans from './MobilePlans'
import "./plans.css";
export default function MainPlans() {
	return (
		<div>
	    <div className="desktop"><Plans/></div>
	    <div className="mobile"><MobilePlans/></div>
			
		</div>
	)
}