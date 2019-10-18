import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Top level App component', () => {
    it('renders', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
    });

    it('has a correct header', () => {
        const wrapper = shallow(<App />);
        const header = wrapper.find('h1');
        expect(header.text()).toEqual('Boxinator');
    });

    it('has links to other pages', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.containsMatchingElement(<Link to={'/addBox'}>Add New Box</Link>)).toBe(true);
        expect(wrapper.containsMatchingElement(<Link to={'/listBoxes'}>List Existing Boxes</Link>)).toBe(true);
    });

});
