import React from 'react'
import {UserAndprofiles} from './user-and-profile'
import {MobileUserAndprofiles} from './Mobileuser-and-profile'
 
export default function UserAndprofile() {
	return (
		<div>
	    <div className="desktop"><UserAndprofiles/></div>
	    <div className="mobile"><MobileUserAndprofiles/></div>
			
		</div>
	)
}