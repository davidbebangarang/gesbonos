import React from 'react';
import { mount, shallow } from 'enzyme';
import { create }from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Payment from '../../components/Payment';

describe('<ViewCards />', () => {
  
  test('Render del componente Payment', () => {
    const payment = shallow(
      <ProviderMock>
        <Payment />
      </ProviderMock>,
    );
    expect(payment.length).toEqual(1);
  });
});
describe('Payment Snapshot', () => {
  test('Comprobar la UI del componente Footer', () => {
    const payment = create(
      <ProviderMock>
        <Payment />
      </ProviderMock>,
    );
    expect(payment.toJSON()).toMatchSnapshot();
  });
});