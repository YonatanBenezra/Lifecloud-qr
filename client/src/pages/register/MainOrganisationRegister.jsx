import React from 'react'
import OrganisationRegister from './OrganisationRegister'
import MobileOrganisationRegister from './MobileOrganisationRegister'
import "./register.css";
export default function MainOrganisationRegister() {
  return (
    <div>
      <div className="desktop"><OrganisationRegister/></div>
      <div className="mobile"><MobileOrganisationRegister/></div>
      
    </div>
  )
}