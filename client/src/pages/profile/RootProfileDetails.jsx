import React from 'react'
import ProfileDetails from './ProfileDetails'
import MobileProfileDetails from './MobileProfileDetails'
import "./profile.css";
export default function RootProfileDetails() {
	return (
		<div>
	    <div className="desktop"><ProfileDetails/></div>
	    <div className="mobile"><MobileProfileDetails/></div>
			
		</div>
	)
}