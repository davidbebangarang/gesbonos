import React from 'react';
import { mount, shallow } from 'enzyme';
import { create }from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import ViewCards from '../../components/viewCards';

describe('<ViewCards />', () => {
  
  test('Render del componente ViewCards', () => {
    const viewCards = shallow(
      <ProviderMock>
        <ViewCards />
      </ProviderMock>,
    );
    expect(viewCards.length).toEqual(1);
  });
});
/*describe('ViewCards Snapshot', () => {
  test('Comprobar la UI del componente Footer', () => {
    const viewCards = create(
      <ProviderMock>
        <ViewCards />
      </ProviderMock>,
    );
    expect(viewCards.toJSON()).toMatchSnapshot();
  });
});*/