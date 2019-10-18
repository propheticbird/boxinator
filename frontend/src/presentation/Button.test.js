import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import { Button } from './Button';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


function setup() {
    const props = {
      onClick: jest.fn(),
      disabled: true,
      title: 'Save'
    }
  
    const enzymeWrapper = shallow(<Button {...props} />)
  
    return {
      props,
      enzymeWrapper
    }
}  

describe('Form submit button', () => {
    it('renders', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.exists()).toBe(true);
    })

    it('has form-submit css class', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.hasClass('form-submit')).toBe(true);        
    })

    it('handles the onClick action', () => {
        const { enzymeWrapper, props } = setup();
        enzymeWrapper.find('button').simulate('click');
        expect(props.onClick.mock.calls.length).toBe(0);
    })

    it('shall have a certain name', () => {
        const { enzymeWrapper, props } = setup();
        const rendered = enzymeWrapper.render();
        expect(rendered.text()).toBe(props.title);
    })

    it('shall have be disabled by default', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.render().attr('disabled')).toBe('disabled');
    })
});