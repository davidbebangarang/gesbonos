import React from 'react';
import {mount} from 'enzyme';
import { create }from 'react-test-renderer';
import Footer from '../../components/Footer';

describe('<Footer />',()=>{
    const footer = mount(<Footer />);
    test('render del componente Footer',()=>{
      
        expect(footer.length).toEqual(1);
    });

    test ('render del titulo',()=>{
        expect(footer.find('.link').text()).toEqual('Gesbonos.com');
    })
});

describe('Footer Snapshot', () => {
    test('Comprobar la UI del componente Footer', () => {
      const footer = create(<Footer />);
      expect(footer.toJSON()).toMatchSnapshot();
    });
  });
