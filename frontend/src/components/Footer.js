import React, {Component} from 'react'

class Footer extends Component {

    render(){
        return(   
            <div style={{ bottom: "0",width:"100%"}}>                          
                <footer className="page-footer font-small blue mt-5 panel-footer foot"> 
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a className="link" href="..."> gesbonos.com</a>
                    </div>
                </footer>
            </div>       
        )
    }
}
export default Footer;