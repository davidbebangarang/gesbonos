import React from 'react';
import { mount, shallow } from 'enzyme';
import { create }from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Bono from '../../components/Bono';

describe('<ViewCards />', () => {
  
  test('Render del componente Bono', () => {
    const bono = shallow(
      <ProviderMock>
        <Bono />
      </ProviderMock>,
    );
    expect(bono.length).toEqual(1);
  });
});

/*describe('Bono Snapshot', () => {
  test('Comprobar la UI del componente Footer', () => {
    const bono = create(
      <ProviderMock>
        <Bono />
      </ProviderMock>,
    );
    expect(bono.toJSON()).toMatchSnapshot();
  });
});*/