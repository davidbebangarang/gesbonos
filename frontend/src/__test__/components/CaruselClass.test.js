import React from 'react';
import { mount, shallow } from 'enzyme';
import { create }from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import CaruselClass from '../../components/CaruselClass';

describe('<ViewCards />', () => {
  
  test('Render del componente CaruselClass', () => {
    const caruselClass = shallow(
      <ProviderMock>
        <CaruselClass />
      </ProviderMock>,
    );
    expect(caruselClass.length).toEqual(1);
  });
});
describe('Bono Snapshot', () => {
  test('CaruselClass la UI del componente Footer', () => {
    const caruselClass = create(
      <ProviderMock>
        <CaruselClass />
      </ProviderMock>,
    );
    expect(caruselClass.toJSON()).toMatchSnapshot();
  });
});