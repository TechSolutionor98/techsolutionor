import React from 'react'
import SecureAppss from '../../../../components/Images/secureapps.svg'
import Image from 'next/image'
const SecureApps = () => {
  return (
    <div>
      <div className="secure-apps-left">
        <Image className='' alt='Secure Apps' src={SecureAppss} width={300} height={300}/>
      </div>
      <div className="secure-apps-right">
        <h1>Build secure apps</h1>
        <p>ASP.NET Core supports industry standard authentication protocols. Built-in features help protect your apps against cross-site scripting (XSS) and cross-site request forgery (CSRF).</p>
        <p>ASP.NET Core provides a built-in user database with support for multi-factor authentication and external authentication with Google, X, and more.</p>
      </div>
    </div>
  )
}

export default SecureApps
