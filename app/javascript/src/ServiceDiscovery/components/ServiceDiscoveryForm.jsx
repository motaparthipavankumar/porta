import React from 'react'
// TODO: Get actionPath from rails
const actionPath = '/p/admin/service_discovery/services'
// TODO: Get authenticityToken from rails
const authenticityToken = ''

const ServiceDiscoveryForm = () => {
  return (
    <form className="formtastic is-hidden" id="service_discovery" action={actionPath} acceptCharset="UTF-8" method="post">
      <input name="utf8" type="hidden" value="✓"/>
      <input type="hidden" name="authenticity_token" value={authenticityToken}/> {/* TODO: Get the authenticity_token */}
      <input value="discover" type="hidden" name="service[source]" id="service_source"/>
      <fieldset className="inputs" name="Service">
        <legend>
          <span>Service</span>
        </legend>
        <ol>
          <li>
            <label htmlFor="namespace">Namespace</label>
            <select required="required" name="service[namespace]" id="service_namespace" data-selected-value=""></select>
          </li>
          <li>
            <label htmlFor="service_name">Name</label>
            <select required="required" name="service[name]" id="service_name"></select>
          </li>
        </ol>
      </fieldset>
      <input type="submit" name="commit" value="Create Service" className="important-button create"/>
    </form>)
}

export default ServiceDiscoveryForm
