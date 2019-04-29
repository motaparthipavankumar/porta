// @flow

import React, {useState, useEffect} from 'react'
import {fetch as fetchPolyfill} from 'whatwg-fetch'

import ServiceSourceForm from 'NewService/components/ServiceSourceForm'
import ServiceDiscoveryForm from 'NewService/components/ServiceDiscoveryForm'
import ServiceNewForm from 'NewService/components/ServiceNewForm'

const BASE_URL = '/p/admin/service_discovery/'
const NAMESPACES_URL = `${BASE_URL}projects.json`

type Props = {
  isServiceDiscoveryAccesible: boolean,
  isServiceDiscoveryUsable: boolean,
  serviceDiscoveryAuthenticateUrl: string,
  providerAdminServiceDiscoveryServicesPath: string,
  adminServicesPath: string
}

const fetchData = async (url: string) => {
  const dataItem = url === NAMESPACES_URL
    ? 'projects'
    : 'services'

  return fetchPolyfill(url).then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
    .then(data => data[dataItem].reduce((acc, current) => acc.concat(current.metadata.name), []))
    .catch(error => console.error(error))
}

// eslint-disable-next-line max-lines-per-function
const NewServiceWrapper = (props: Props) => {
  const [isServDescVisible, setServDescVisible] = useState(false)
  const [isServNewVisible, setServNewVisible] = useState(true)
  const [namespaces, setNamespaces] = useState([])
  const [services, setServices] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState(undefined)
  const [servicesRequested, setServicesRequested] = useState(false)

  const settingSelectedNamespace = (namespace: string) => {
    setSelectedNamespace(namespace)
  }

  const onChangeNamespaces = (event: SyntheticEvent<HTMLSelectElement>) => {
    setSelectedNamespace(event.currentTarget.value)
    setServicesRequested(true)
  }

  const startNamespacesFetch = async (): Promise<any> => {
    const namespacesData = await fetchData(NAMESPACES_URL)
    setNamespaces(namespacesData)
    setServicesRequested(true)
    settingSelectedNamespace(namespacesData[0])
  }

  const startServicesFetch = async (servicesUrl: string) => {
    setServices([])
    const servicesData = await fetchData(servicesUrl)
    setServices(servicesData)
    setServicesRequested(false)
  }

  const handleFormsVisibility = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === 'discover') {
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

  const formsProps: {
    source: {
      isServiceDiscoveryUsable: boolean,
      serviceDiscoveryAuthenticateUrl: string,
      onHandleFormsVisibility: (event: SyntheticEvent<HTMLInputElement>) => void,
      onStartNamespacesFetch: () => Promise<any>
    },
    serviceDiscovery: {
      isVisible: boolean,
      providerAdminServiceDiscoveryServicesPath: string,
      onSettingSelectedNamespace: (namespace: string) => void,
      namespaces: string[],
      services: string[],
      selectedNamespace?: string,
      handleChangeNamespaces: (event: SyntheticEvent<HTMLSelectElement>) => void
    },
    serviceNew: {
      isVisible: boolean,
      adminServicesPath: string
    }
  } = {
    source: {
      isServiceDiscoveryUsable: props.isServiceDiscoveryUsable,
      serviceDiscoveryAuthenticateUrl: props.serviceDiscoveryAuthenticateUrl,
      onHandleFormsVisibility: handleFormsVisibility,
      onStartNamespacesFetch: startNamespacesFetch
    },
    serviceDiscovery: {
      isVisible: isServDescVisible,
      providerAdminServiceDiscoveryServicesPath: props.providerAdminServiceDiscoveryServicesPath,
      onSettingSelectedNamespace: settingSelectedNamespace,
      namespaces: namespaces,
      services: services,
      selectedNamespace: selectedNamespace,
      handleChangeNamespaces: onChangeNamespaces
    },
    serviceNew: {
      isVisible: isServNewVisible,
      adminServicesPath: props.adminServicesPath
    }
  }

  return (
    <React.Fragment>
      <h1>NEW API</h1>
      <ServiceSourceForm {...formsProps.source}/>
      <ServiceDiscoveryForm {...formsProps.serviceDiscovery}/>
      <ServiceNewForm {...formsProps.serviceNew}/>
    </React.Fragment>
  )
}

export default NewServiceWrapper
