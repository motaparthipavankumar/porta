import React, {useState, useEffect} from 'react'
import {fetch as fetchPolyfill} from 'whatwg-fetch'

import ServiceSourceForm from 'NewService/components/ServiceSourceForm'
import ServiceDiscoveryForm from 'NewService/components/ServiceDiscoveryForm'
import ServiceNewForm from 'NewService/components/ServiceNewForm'

const BASE_URL = '/p/admin/service_discovery/'
const NAMESPACES_URL = `${BASE_URL}projects.json`

const fetchData = async (url) => {
  return fetchPolyfill(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .catch(error => console.error(error))
}

const NewServiceWrapper = (props) => {
  const [isServDescVisible, setServDescVisible] = useState(false)
  const [isServNewVisible, setServNewVisible] = useState(true)
  const [namespaces, setNamespaces] = useState([])
  const [services, setServices] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState(undefined)
  const [servicesRequested, setServicesRequested] = useState(false)

  const settingSelectedNamespace = (namespace) => {
    setSelectedNamespace(namespace)
  }

  const onChangeNamespaces = (event) => {
    setSelectedNamespace(event.target.value)
    setServicesRequested(true)
  }

  const startNamespacesFetch = async () => {
    const namespacesData = await fetchData(NAMESPACES_URL).then(data => data.projects.reduce((acc, current) => acc.concat(current.metadata.name), []))
    setNamespaces(namespacesData)
    setServicesRequested(true)
    settingSelectedNamespace(namespacesData[0])
  }

  const startServicesFetch = async (servicesUrl) => {
    setServices([])
    const servicesData = await fetchData(servicesUrl).then(data => data.services.reduce((acc, current) => acc.concat(current.metadata.name), []))
    setServices(servicesData)
    setServicesRequested(false)
  }

  const handleFormsVisibility = (event) => {
    if (event.target.value === 'discover') {
      setServDescVisible(true)
      setServNewVisible(false)
    } else {
      setServDescVisible(false)
      setServNewVisible(true)
    }
  }

  useEffect(() => {
    if (servicesRequested && selectedNamespace) {
      const SERVICES_URL = `${BASE_URL}namespaces/${selectedNamespace}/services.json`
      startServicesFetch(SERVICES_URL)
    }
  }, [servicesRequested, selectedNamespace])

  const sourceFormProps = {
    isServiceDiscoveryUsable: props.isServiceDiscoveryUsable,
    serviceDiscoveryAuthenticateUrl: props.serviceDiscoveryAuthenticateUrl,
    onHandleFormsVisibility: handleFormsVisibility,
    onStartNamespacesFetch: startNamespacesFetch
  }

  const serviceDiscoveryFormProps = {
    isVisible: isServDescVisible,
    providerAdminServiceDiscoveryServicesPath: props.providerAdminServiceDiscoveryServicesPath,
    onSettingSelectedNamespace: settingSelectedNamespace,
    namespaces: namespaces,
    services: services,
    selectedNamespace: selectedNamespace,
    handleChangeNamespaces: onChangeNamespaces
  }

  const serviceNewProps = {
    isVisible: isServNewVisible,
    adminServicesPath: props.adminServicesPath
  }

  return (
    <React.Fragment>
      <h1>NEW API</h1>
      <ServiceSourceForm {...sourceFormProps}/>
      <ServiceDiscoveryForm {...serviceDiscoveryFormProps}/>
      <ServiceNewForm {...serviceNewProps}/>
    </React.Fragment>
  )
}

export default NewServiceWrapper
