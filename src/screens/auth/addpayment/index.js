import React, { Component } from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import { getCardToken, RegisterCustomer, SetSubscription } from '../../../api/payment';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { setTimeout } from 'timers';

import 'react-notifications/lib/notifications.css';
import './styles.scss';

class AddPayment extends Component {
    
    constructor() {
        super();

        this.state = {
            number: '',
            name: '',
            exp: '',
            cvc: '',
        };

        this.AddPayment = this.AddPayment.bind(this);
    }

    componentWillMount() {
        
    }

    AddPayment() {
        if ( !this.state.number & !this.state.name & !this.state.cvc ) {
            NotificationManager.error( 'Input your card information!', 'Error occured', 2000 );
        }
        if ( this.state.exp === '' ) {
            NotificationManager.error( 'Expiration date is not valid!', 'Error occured', 2000 );
        }

        var result = true;
        
        // get current year and month
        var d = new Date();
        var currentYear = d.getFullYear();
        var currentMonth = d.getMonth() + 1;
        // get parts of the expiration date
        var month = parseInt(this.state.exp.substring(0, 2), 10 );
        var year = this.state.exp.substring(2) === "" ? 0 : parseInt(this.state.exp.substring(2), 10) + 2000;
            // compare the dates
        if (year < currentYear || (year === currentYear && month < currentMonth) || year === 'NaN') {
            result = false;
        }

        if ( !result ) {
            NotificationManager.error( 'Expiration date is not valid!', 'Error occured', 2000 );
        }
        
        return getCardToken(this.state.name, this.state.number, month, year, this.state.cvc).then(resp => {
            if(resp.error){
                console.log(resp.error);
                NotificationManager.error( 'Payment server broken!', 'Error occured', 2000 );
            }
            else{
                var userMail = this.props.registeredEmail;
                
                if(userMail !== null){
                    return RegisterCustomer(userMail, 'Customer for SlipCloud', resp.result.id).then(resp1 => {
                        if(resp1.error){
                            NotificationManager.error( 'Payment server broken!', 'Error occured', 2000 );
                        }
                        else{
                            return SetSubscription(resp1.result.id,'Ghost').then(resp2 => {
                                if(resp2.error){
                                    NotificationManager.error( 'Payment server broken!', 'Error occured', 2000 );
                                }
                                else {
                                    NotificationManager.success( 'Payment method has been added successfully!', 'Alert', 2000 );
                                    setTimeout( () => {
                                        browserHistory.push('/home/');
                                    }, 2000);
                                }
                            });
                        }
                    });
                }   
                else{
                    return 0;
                }
            }
        });
    }

    handleChange(attr, event){
		this.setState({
			[attr]: event.target.value
		});
    }
    
    render() {
        return (
            <div className = 'mainView'>
                <img src='../../../res/images/logo.png' className = 'logo' alt = 'logo.png'/>

				<div className = 'row'>
					<label className = 'avenir-black' style = {{ color : '#46B2ED', fontSize : '2.3rem' }} >Slipstream</label>
					<label className = 'avenir-roman' style = {{ color : '#037CBE', fontSize : '2.3rem' }} >.cloud</label>
				</div>

                <div className = 'row'>
                    <div className = 'mt-4' style = {{ width : 800 }} >
                        <div className = 'row' style = {{ display : 'flex', flexDirection : 'column', alignItems : 'center', backgroundColor : '#46B2ED', paddingTop : 40, paddingBottom : 40, paddingLeft : 100, paddingRight : 100 }}>
                            <label className = 'avenir-medium' style = {{ fontSize : '2rem', color : 'white' }}>Security is important to us.</label>
                            <label className = 'avenir-roman' style = {{ fontSize : '1.3rem', color : 'white', textAlign : 'center' }}>
                                To protect your privacy and prevent abuse we must ask that you verify your identify. You <b>will not be charged beyond</b> the limits of our <u><b>free tier</b></u>, which is refreshed monthly,<br/> Unless <b>you manually enable billing</b> on your account
                            </label>
                        </div>

                        <div className = 'row' style = {{  display : 'flex', flexDirection : 'column', alignItems : 'center', backgroundColor : 'white', paddingTop : 40, paddingBottom : 40, paddingLeft : 80, paddingRight : 80 }}>
                            <div className = 'row' style = {{ width : '100%'}}>
                                <input 
                                    value = { this.state.number }
                                    onChange = { this.handleChange.bind(this, 'number') } 
                                    className = 'form-control loginInput col-7' 
                                    placeholder="Credit Card Number" />

                                <div className = 'col-1'>
                                </div>

                                <input 
                                    value = { this.state.cvc }
                                    onChange = { this.handleChange.bind(this, 'cvc') } 
                                    className = 'form-control loginInput col-4' 
                                    placeholder="Security code" />
                            </div>

                            <div className = 'row mt-3' style = {{ width : '100%'}}>
                                <img src='../../../res/images/creditcards.jpg' style = {{ height : 30 }} alt = 'creditcards'/>
                            </div>

                            <div className = 'row mt-3' style = {{ width : '100%'}}>
                                <input 
                                    value = { this.state.exp }
                                    onChange = { this.handleChange.bind(this, 'exp') } 
                                    className = 'form-control loginInput' 
                                    style = {{ width : '45%'}}
                                    placeholder="Expiration Date" />
                                <div style = {{ width : '10%'}}>
                                </div>
                                <input 
                                    value = { this.state.name }
                                    onChange = { this.handleChange.bind(this, 'name') } 
                                    className = 'form-control loginInput' 
                                    style = {{ width : '45%'}}
                                    placeholder="Name on Card" />
                            </div>

                            <div 
                                className = 'clickable mt-5' 
                                style = {{ width : 200, height : 50, backgroundColor : '#46B2ED' ,borderTopLeftRadius : 22.5, borderTopRightRadius : 22.5, borderBottomLeftRadius : 22.5, borderBottomRightRadius : 22.5, display : 'flex', justifyContent : 'center', alignItems : 'center' }}
                                onClick = { this.AddPayment }
                                >
                                <label className = 'avenir-medium clickable m-0' style = {{ color : 'white' }}>Add Payment</label>
                            </div>

                            <div className = 'row mt-3'>
                                <label className = 'avenir-medium mb-0' style = {{ color : '#C2C2C2' }}>By clicking you agree of our</label>
                                <label className = 'avenir-medium mb-0 ml-1' style = {{ color : '#84CCF3' }}>terms of use</label>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}
  
function mapDispatchToProps(dispatch) { 
    return {
        dispatch,
    }; 
}
  
function mapStateToProps(state){
    return {
        auth : state.auth,
        registeredEmail : state.auth.registerEmail
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps )(AddPayment);
