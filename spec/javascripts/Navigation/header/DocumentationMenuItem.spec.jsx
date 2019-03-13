import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { DocumentationMenuItem } from 'Navigation/components/header/DocumentationMenuItem'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  docsLinksClass: 'link-class',
  item: {
    text: 'Customer Portal',
    href: '#',
    iconClass: 'fa-external-link',
    target: '_blank'
  }
}

describe('<DocumentationMenuItem/>', () => {
  it('renders <DocumentationMenuItem/> component', () => {
    const wrapper = shallow(<DocumentationMenuItem {...props} />)
    expect(wrapper.find('.PopNavigation-listItem')).toHaveLength(1)
    expect(wrapper.find('a')).toHaveLength(1)
    expect(wrapper.find('a').hasClass(props.docsLinksClass)).toEqual(true)
    expect(wrapper.find('a').props().target).toEqual(props.item.target)
    expect(wrapper.find('a').props().href).toEqual(props.item.href)
    expect(wrapper.find('a').text()).toContain(props.item.text)
    expect(wrapper.find('.fa').hasClass(props.item.iconClass)).toEqual(true)
  })
})
