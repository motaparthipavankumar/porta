import React from 'react'
// TODO: Get authenticityToken from rails
const authenticityToken = ''

const ServiceNewForm = ({isVisible, adminServicesPath}) => {
  return (
    // Eslint is complaining about similar blocks (forms)
    // TODO: Create a reusable react form component
    // eslint-disable-next-line
    <form className={`formtastic service ${isVisible ? '' : 'is-hidden'}`} id="new_service" action={adminServicesPath} acceptCharset="UTF-8" method="post">
      <input name="utf8" type="hidden" defaultValue="✓"/>
      <input type="hidden" name="authenticity_token" defaultValue={authenticityToken}/> {/* TODO: Get the authenticity_token */}
      <fieldset className="inputs" name="Service">
        <legend>
          <span>Service</span>
        </legend>
        <ol>
          <li id="service_name_input" className="string required">
            <label htmlFor="service_name">Name
              <abbr title="required">*</abbr>
            </label>
            <input maxLength="255" id="service_name" type="text" name="service[name]" />
          </li>
          <li id="service_system_name_input" className="string required">
            <label htmlFor="service_system_name">System name
              <abbr title="required">*</abbr>
            </label>
            <input maxLength="255" id="service_system_name" type="text" name="service[system_name]" />
            <p className="inline-hints">Only ASCII letters, numbers, dashes and underscores are allowed.</p>
          </li>
          <li id="service_description_input" className="text optional">
            <label htmlFor="service_description">Description</label>
            <textarea rows="3" id="service_description" name="service[description]">
            </textarea>
          </li>
        </ol>
      </fieldset>
      <input type="submit" name="commit" value="Add API" className="important-button create"/>
    </form>)
}

export default ServiceNewForm
