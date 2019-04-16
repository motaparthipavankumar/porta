import React, {useState} from 'react'

import ServiceSourceForm from 'NewService/components/ServiceSourceForm'
import ServiceDiscoveryForm from 'NewService/components/ServiceDiscoveryForm'
import ServiceNewForm from 'NewService/components/ServiceNewForm'

const NewServiceWrapper = (props) => {
  const [isServDescVisible, setServDescVisible] = useState(false)
  const [isServNewVisible, setServNewVisible] = useState(true)

  const handleFormsVisibility = (event) => {
    if (event.target.value === 'discover') {
      setServDescVisible(true)
      setServNewVisible(false)
    } else {
      setServDescVisible(false)
      setServNewVisible(true)
    }
  }

  const sourceFormProps = {
    isServiceDiscoveryUsable: props.isServiceDiscoveryUsable,
    serviceDiscoveryAuthenticateUrl: props.serviceDiscoveryAuthenticateUrl,
    providerAdminServiceDiscoveryServicesPath: props.providerAdminServiceDiscoveryServicesPath,
    onHandleFormsVisibility: handleFormsVisibility
  }

  return (<div>
    <h1>NEW API</h1>
    <ServiceSourceForm {...sourceFormProps}/>
    <ServiceDiscoveryForm isVisible={isServDescVisible}/>
    <ServiceNewForm isVisible={isServNewVisible}/>
  </div>)
}

export default NewServiceWrapper
