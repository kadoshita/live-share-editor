import React from 'react';
import { TextField, Dialog, DialogTitle, Button } from '@material-ui/core';
import InputDialog from './InputDialog';
import { act } from 'react-dom/test-utils';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

let shallow = null;

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  shallow = createShallow();
});

it('InputDialog render', () => {
  let wrapper = null;
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={true}
      label='TEST'
      onChangeInput={value => console.log(value)}
      togglOpen={() => console.log('togglOpen')}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog>);
  });
  expect(wrapper.find(Dialog).length).toBe(1);
  expect(wrapper.find(DialogTitle).length).toBe(1);
  expect(wrapper.find(Button).length).toBe(2);
  expect(wrapper.find(TextField).length).toBe(1);
});

it('InputDialog set visibility', () => {
  let wrapper = null;
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={true}
      label='TEST'
      onChangeInput={value => console.log(value)}
      togglOpen={() => console.log('togglOpen')}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog>);
  });
  expect(wrapper.find(Dialog).prop('open')).toBe(true);
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={false}
      label='TEST'
      onChangeInput={value => console.log(value)}
      togglOpen={() => console.log('togglOpen')}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog>);
  });
  expect(wrapper.find(Dialog).prop('open')).toBe(false);
});

it('InputDialog render text', () => {
  let wrapper = null;
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={true}
      label='TEST'
      onChangeInput={value => console.log(value)}
      togglOpen={() => console.log('togglOpen')}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog>);
  });
  expect(wrapper.find(DialogTitle).text()).toBe('TEST');
  expect(wrapper.find(TextField).prop('label')).toBe('TEST');
  expect(wrapper.find(Button).at(0).text()).toBe('キャンセル');
  expect(wrapper.find(Button).at(1).text()).toBe('OK');
});

it('InputDialog button click', () => {
  let wrapper = null;
  let execFlag = false;
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={true}
      label='TEST'
      onChangeInput={value => console.log(value)}
      togglOpen={(open, exec) => execFlag = exec}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog >);
  });
  wrapper.find(Button).at(0).simulate('click');
  expect(execFlag).toBe(false);
  wrapper.find(Button).at(1).simulate('click');
  expect(execFlag).toBe(true);
});

it('InputDialog text input', () => {
  let wrapper = null;
  let inputValue = '';
  act(() => {
    wrapper = shallow(<InputDialog
      title='TEST'
      show={true}
      label='TEST'
      onChangeInput={value => inputValue = value}
      togglOpen={() => console.log('togglOpen')}
      okButtonTitle='OK'
      cancelButtonTitle='キャンセル'
      rowCount={1}
    ></InputDialog >);
  });
  wrapper.find(TextField).at(0).simulate('change', { target: { value: 'sample text' } });
  expect(inputValue).toBe('sample text');
});