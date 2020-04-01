import React from 'react';
import ClipBoard from 'clipboard';
import ClipboardText from './ClipboardText';
import { act } from 'react-dom/test-utils';
import { TextField, Tooltip } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

let mount = null;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  mount = createMount();
});

it('ClipboardText render', () => {
  let wrapper = null;
  act(() => {
    wrapper = mount(<div><ClipboardText clipboard={ClipBoard} value='test text'></ClipboardText></div>);
  });
  expect(wrapper.find(TextField).length).toBe(1);
  expect(wrapper.find(Tooltip).length).toBe(1);
});

it('ClipboardText set value', () => {
  let wrapper = null;
  act(() => {
    wrapper = mount(<div><ClipboardText clipboard={ClipBoard} value='test text'></ClipboardText></div>);
  });
  expect(wrapper.find(TextField).prop('value')).toBe('test text');
});