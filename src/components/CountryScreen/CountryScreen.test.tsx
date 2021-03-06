import React from 'react';
import { shallow } from 'enzyme';
import CountryScreen from './CountryScreen';

describe('<CountryScreen />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CountryScreen />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
