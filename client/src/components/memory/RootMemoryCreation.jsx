import React from 'react'
import MemoryCreation from './memoryCreation'
import MobileMemoryCreation from './MobileMemoryCreation'
import "./memory-creation.css";
export default function MainMemoryCreation() {
	return (
		<div>
	    <div className="desktop"><MemoryCreation/></div>
	    <div className="mobile"><MobileMemoryCreation/></div>
			
		</div>
	)
}