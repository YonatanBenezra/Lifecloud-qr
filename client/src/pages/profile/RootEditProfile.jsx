import React from 'react'
import EditProfile from './edit-proile'
import MobileEditProfile from './MobileEditProfile'
import "./profile.css";
export default function RootMobileEditProfile() {
	return (
		<div>
	    <div className="desktop"><EditProfile/></div>
	    <div className="mobile"><MobileEditProfile/></div>
		</div>
	)
}