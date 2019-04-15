import React from 'react'
import ServiceSourceForm from 'ServiceDiscovery/components/ServiceSourceForm'
import ServiceDiscoveryForm from 'ServiceDiscovery/components/ServiceDiscoveryForm'

const ServiceDiscovery = (props) => {
  const {isServiceDiscoveryUsable, serviceDiscoveryAuthenticateUrl, providerAdminServiceDiscoveryServicesPath} = props

  return (<div>
    <ServiceSourceForm isServiceDiscoveryUsable={isServiceDiscoveryUsable} serviceDiscoveryAuthenticateUrl={serviceDiscoveryAuthenticateUrl}/>
    <ServiceDiscoveryForm/>
  </div>)
}

export default ServiceDiscovery
