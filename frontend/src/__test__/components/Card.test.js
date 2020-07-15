import React from 'react';
import { mount, shallow } from 'enzyme';
import { create }from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Card from '../../components/Card';
import BonoMock from '../../__mocks__/BonoMock';

describe('<Card />', () => {
  
  test('Render del componente Cards', () => {
    const card = shallow(
      <ProviderMock>
        <Card />
      </ProviderMock>,
    );
    expect(card.length).toEqual(1);
  });

  describe('Card Snapshot', () => {
    test('Comprobar la UI del componente Card', () => {
      const card = create(
        <ProviderMock>
          <Card />
        </ProviderMock>,
      );
      expect(card.toJSON()).toMatchSnapshot();
    });
  });
  /*test('Comprobar el boton de comprar', () => {
    const onClcik = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Card
          props={BonoMock}
        />
      </ProviderMock>,
    );
    wrapper.find('tarjeta').simulate('click');
    expect(onClcik).toHaveBeenCalledTimes(1);
  });*/
});