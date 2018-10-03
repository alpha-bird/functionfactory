import React, { Component } from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import { getCardToken, RegisterCustomer, SetSubscription } from '../../../api/payment';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import CardComponent from '../../../components/cardcomponent';
import './styles.scss';

class AddPayment extends Component {
    
    constructor() {
        super();

        this.state = {
            number: '',
            name: '',
            exp: '',
            cvc: '',
            focused: '',
        };
    }

    componentWillMount() {
        
    }

    onAddPayment(cardnumber, name, expire_month, expire_year , cvc ) {
        return getCardToken(name, cardnumber, expire_month, expire_year, cvc).then(resp => {
            if(resp.error){
                return -1;
            }
            else{
                var userMail = localStorage.getItem('User_Email');
                if(userMail !== null){
                    return RegisterCustomer(userMail, 'Customer for SlipCloud', resp.result.id).then(resp1 => {
                        if(resp1.error){
                            return -2;
                        }
                        else{
                            return SetSubscription(resp1.result.id,'Ghost').then(resp2 => {
                                if(resp2.error){
                                    return -3;
                                }
                                else {
                                    return 1;
                                }
                            });
                        }
                    });
                }   
                else{
                    return 0;
                }
            }
        }) 
    }
    render() {
        return (
        <div className = 'container-fluid' style = {{backgroundColor : "#f5f5f5"}}>
            <div className = 'row payment-method'>
                <div className = 'col-xl-6 col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12 offset-xs-0'>
                    <div className = 'payment-header'>
                        <label>Payment & Financials</label>
                    </div>
                    <div className = 'creditcard-container'>
                        <div style = {{ paddingBottom : 40,  paddingTop : 40, paddingLeft : 80}}>
                            <label className = 'payment-text'>Payment Methods</label>
                        </div>
                        <CardComponent 
                            style={{ paddingBottom : 20, paddingTop : 20, paddingLeft : 80, paddingRight : 20 }}
                            onAddPayment = { 
                                (cardnumber, name, expire_month, expire_year , cvc) => { 
                                    return this.onAddPayment(cardnumber, name, expire_month, expire_year, cvc); 
                                }  
                            }
                            />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const RadiumHOC = Radium(AddPayment);
  
function mapDispatchToProps(dispatch) { 
    return {
        dispatch,
    }; 
}
  
function mapStateToProps(state){
    return {
        auth : state.auth
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps )(RadiumHOC);
