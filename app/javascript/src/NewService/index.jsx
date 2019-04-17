import React, {useState, useEffect} from 'react'
import {fetch as fetchPolyfill} from 'whatwg-fetch'

import ServiceSourceForm from 'NewService/components/ServiceSourceForm'
import ServiceDiscoveryForm from 'NewService/components/ServiceDiscoveryForm'
import ServiceNewForm from 'NewService/components/ServiceNewForm'

const NewServiceWrapper = (props) => {
  const BASE_URL = '/p/admin/service_discovery/'
  const NAMESPACES_URL = `${BASE_URL}projects.json`

  const [isServDescVisible, setServDescVisible] = useState(false)
  const [isServNewVisible, setServNewVisible] = useState(true)
  const [namespaces, setNamespaces] = useState([])
  const [services, setServices] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState('')
  const [namespacesFetched, setNamespacesFetched] = useState(false)
  const [servicesFetched, setServicesFetched] = useState(false)

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

  const fetchNamespaces = async () => {
    return fetchData(NAMESPACES_URL).then(data => {
      return data.projects.reduce(
        (acc, current) => acc.concat(current.metadata.name),
        [])
    })
  }

  const fetchServices = async () => {
    const SERVICES_URL = `${BASE_URL}namespaces/${selectedNamespace}/services.json`
    return fetchData(SERVICES_URL).then(data => {
      return data.services.reduce(
        (acc, current) => acc.concat(current.metadata.name),
        [])
    })
  }

  const settingSelectedNamespace = (event) => {
    setSelectedNamespace(event.target.value)
    startServicesFetch()
  }

  const startNamespacesFetch = async () => {
    setNamespacesFetched(false)
    setServicesFetched(false)
    const namespacesData = await fetchNamespaces()
    setNamespaces(namespacesData)
    setSelectedNamespace(namespacesData[0])
    setNamespacesFetched(true)
  }

  const startServicesFetch = async () => {
    const servicesData = await fetchServices()
    setServicesFetched(true)
    setServices(servicesData)
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
    if (namespacesFetched && !servicesFetched && selectedNamespace !== '') {
      startServicesFetch()
    }
  })

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
    services: services
  }

  return (
    <React.Fragment>
      <h1>NEW API</h1>
      <ServiceSourceForm {...sourceFormProps}/>
      <ServiceDiscoveryForm {...serviceDiscoveryFormProps}/>
      <ServiceNewForm isVisible={isServNewVisible}/>
    </React.Fragment>
  )
}

export default NewServiceWrapper
