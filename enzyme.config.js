/** Used in jest.config.js */
import React from 'react';
import toJson from 'enzyme-to-json';

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.toJson = toJson;
global.shallow = shallow;
global.mount = mount;
global.render = render;
