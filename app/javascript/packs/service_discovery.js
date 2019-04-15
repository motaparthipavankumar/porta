import React from 'react'
import {render} from 'react-dom'
import ServiceDiscovery from 'ServiceDiscovery/index'

document.addEventListener('DOMContentLoaded', () => {
  const serviceDiscoveryWrapper = document.getElementById('service_discovery_wrapper')
  const dataset = serviceDiscoveryWrapper.dataset

  const props = {
    isServiceDiscoveryUsable: dataset.isServiceDiscoveryUsable === 'true',
    serviceDiscoveryAuthenticateUrl: dataset.serviceDiscoveryAuthenticateUrl,
    providerAdminServiceDiscoveryServicesPath: dataset.providerAdminServiceDiscoveryServicesPath
  }

  render(<ServiceDiscovery {...props}/>, serviceDiscoveryWrapper)
})
