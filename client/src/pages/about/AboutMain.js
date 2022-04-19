import React from 'react'
import About from './About'
import MobileAbout from './MobileAbout'
import "./about.css";
export default function AboutMain() {
	return (
		<div>
	    <div className="desktop"><About/></div>
	    <div className="mobile"><MobileAbout/></div>
			
		</div>
	)
}