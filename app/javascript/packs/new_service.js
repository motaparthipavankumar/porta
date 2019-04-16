import React from 'react'
import {render} from 'react-dom'
import NewServiceWrapper from 'NewService/index'

document.addEventListener('DOMContentLoaded', () => {
  const newServiceWrapper = document.getElementById('new_service_wrapper')
  const newServiceData = JSON.parse(newServiceWrapper.dataset.newServiceData)
  console.dir(newServiceData)
  const props = {
    isServiceDiscoveryAccesible: newServiceData.isServiceDiscoveryAccesible,
    isServiceDiscoveryUsable: newServiceData.isServiceDiscoveryUsable,
    serviceDiscoveryAuthenticateUrl: newServiceData.serviceDiscoveryAuthenticateUrl,
    providerAdminServiceDiscoveryServicesPath: newServiceData.providerAdminServiceDiscoveryServicesPath
  }
  render(<NewServiceWrapper {...props}/>, newServiceWrapper)
})
