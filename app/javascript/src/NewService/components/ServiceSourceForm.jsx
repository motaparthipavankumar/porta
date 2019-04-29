// @flow

import React from 'react'

type Props = {
  isServiceDiscoveryUsable: boolean,
  serviceDiscoveryAuthenticateUrl: string,
  onHandleFormsVisibility: (event: SyntheticEvent<HTMLInputElement>) => void,
  onStartNamespacesFetch: () => Promise<any>
}

const ServiceSourceForm = (props: Props) => {
  const {isServiceDiscoveryUsable, serviceDiscoveryAuthenticateUrl, onHandleFormsVisibility, onStartNamespacesFetch} = props
  return (<form className="formtastic" id="new_service_source">
    <fieldset className="inputs">
      <ol>
        <li className="radio">
          <label htmlFor="source_manual">
            <input type="radio" name="source" id="source_manual" value="manual" defaultChecked="defaultChecked" onChange={onHandleFormsVisibility}/> Define manually
          </label>
        </li>
        <li className="radio">
          <label htmlFor="source_discover">
            <input type="radio" name="source" id="source_discover" value="discover" disabled={!isServiceDiscoveryUsable} onChange={onHandleFormsVisibility} onClick={onStartNamespacesFetch}/> Import from OpenShift
            {
              !isServiceDiscoveryUsable && <a href={serviceDiscoveryAuthenticateUrl}> (Authenticate to enable this option)</a>
            }
          </label>
        </li>
      </ol>
    </fieldset>
  </form>)
}

export default ServiceSourceForm
