import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import './styles.scss';
import './fonts.scss';
class InitialScreen extends Component {
    constructor() {
        super();

        this.state = {
            isResize : false
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll() {
        if( document.documentElement.scrollTop <= 100 ) {
            this.setState({
                isResize : false
            });
        }
        else {
            this.setState({
                isResize : true
            });
        }
    }

    onLogin() {
        browserHistory.push('/auth');
    }

    render () {
        return (
            <div className = 'container-fluid'>
                <nav className="navbar navbar-initial fixed-top navbar-expand-lg navbar-light bg-light" style = {{ minHeight : this.state.isResize ? 60 : 90 }}>
                    <div className="navbar-brand brand-initial" style = {{ height : this.state.isResize ? 60 : 90 }}>
                        <img  className = 'nav-logo' src='../../../res/images/logo.png' alt = 'logo.png'/>
                        <div className = 'titleContainer'>
                            <label className = 'title1 avenir-black'>Slipstream</label>
                            <label className = 'title2 avenir-roman'>.cloud</label>
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <div className = 'navbar-nav' style = {{ display : 'flex', justifyContent : 'flex-end', width : '100%'}}>
                            <div className = 'nav-item nav-item-initial div-center' >
                                <label className = 'titleItem avenir-black clickable'> Home </label>
                            </div>
                            <div className = 'nav-item nav-item-initial1 div-center' >
                                <label className = 'titleItemDisabled avenir-roman clickable' > Contact </label>
                            </div>
                            <div className = 'nav-item nav-item-initial1 div-center' >
                                <label className = 'titleItemDisabled avenir-roman clickable' onClick = { this.onLogin }> Login </label>
                            </div>
                            <div className = 'nav-item nav-item-initial2 div-center' >
                                <label className = 'titleItemDisabled avenir-roman clickable' > Join Now </label>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className = 'content'>
                    <div className = 'row paragraph1'>
                        <img src='../../../res/images/logo.png' className = 'logo1' alt = 'logo.png'/>

                        <div>
                            <label className = 'title3 avenir-black'>Slipstream</label>
                            <label className = 'title4 avenir-roman'>.cloud</label>
                        </div>
                        
                        <div style = {{ marginTop : 10 }}>
                            <label className = 'title5 avenir-heavy'>Embrace the era</label>
                            <label className = 'title6 avenir-roman' style = {{ marginLeft : 10 }}>of serverless architecture</label> <br/>
                            <label className = 'title7 avenir-roman'>Lorem ipsum ep cteren diem csrpe</label>
                        </div>

                        <div className = 'joinnowbutton'>
                            <label className = 'joinLabel avenir-roman'>Join Now</label>
                        </div>

                        <img className = 'centerImage' src='../../../res/images/headerimage.png' alt = 'centerimage'/>
                    </div>

                    <div className = 'row paragraph2'>
                        <div className = 'block-para'>
                            <img src='../../../res/images/cloud-hosted.png' style = {{ width : 160, height : 120 }} alt = 'cloud-hosted'/>
                            <label className = 'block-text avenir-medium' >Cloud Hosted</label>
                            <label className = 'block-text1 avenir-medium' >Lorem ipsum dolor sit amet, consecteur adipiscing elit. Nam hendreit nisl sed rhoncus euismod. fringilla sed, cursus a</label>
                        </div>

                        <div className = 'block-para'>
                            <img src='../../../res/images/component-based.png' style = {{ width : 160, height : 120 }} alt = 'component-based'/>
                            <label className = 'block-text avenir-medium' >Component Based</label>
                            <label className = 'block-text1 avenir-medium' >Lorem ipsum dolor sit amet, consecteur adipiscing elit. Nam hendreit nisl sed rhoncus euismod. fringilla sed, cursus a</label>
                        </div>
                        
                        <div className = 'block-para'>
                            <img src='../../../res/images/web-compiled.png' style = {{ width : 160, height : 120 }} alt = 'web-compiled'/>
                            <label className = 'block-text avenir-medium' >Web Compiled</label>
                            <label className = 'block-text1 avenir-medium' >Lorem ipsum dolor sit amet, consecteur adipiscing elit. Nam hendreit nisl sed rhoncus euismod. fringilla sed, cursus a</label>
                        </div>
                    </div>

                    <div className = 'row paragraph3'>
                        <label className = 'para3-title avenir-medium' >Component Library</label>
                        <div className = 'row comcard-container' >
                        
                            <div className = 'comcard' >
                                <div>
                                    <label className = 'component-title avenir-medium'>Component Title</label>
                                    <label className = 'component-text avenir-medium' >Lorem ipsum dolor sit amet, consecteur adipiscing elit. Nam hendreit nisl sed rhoncus euismod. fringilla sed, cursus a magna. Aenean</label>
                                </div>
                                
                                <div className = 'component-info-container'>
                                    <div className = 'component-type-content'>
                                        <label className = 'component-type-text avenir-black'>JS</label>
                                    </div>
                                    <label className = 'component-info-text avenir-medium'>43KB - Posted SEP 19, 2017</label>
                                </div>
                            </div>

                            <div className = 'comcard' >
                                <div>
                                    <label className = 'component-title avenir-medium'>Component Title</label>
                                    <label className = 'component-text avenir-medium' >Lorem ipsum dolor sit amet, consecteur adipiscing elit. Nam hendreit nisl sed rhoncus euismod. fringilla sed, cursus a magna. Aenean</label>
                                </div>
                                
                                <div className = 'component-info-container'>
                                    <div className = 'component-type-content' style = {{ backgroundColor : '#3BCD86'}}>
                                        <label className = 'component-type-text avenir-black'>Node.JS</label>
                                    </div>
                                    <label className = 'component-info-text avenir-medium'>43KB - Posted SEP 19, 2017</label>
                                </div>
                            </div>
                        </div>

                        <div className = 'viewAllButton'>
                            <label className = 'avenir-medium' style = {{ margin : 0, color : 'white', fontSize : '1.2rem'}}>View All</label>
                        </div>
                    </div>

                    <div className = 'row paragraph4'>
                        <div className = 'row' style = {{ display : 'flex', flexDirection : 'row'}}>
                            <label className = 'avenir-medium' style = {{color : '#8ACEF4', fontSize : '2.4rem', marginRight : 10}}>What are you </label>
                            <label className = 'avenir-roman' style = {{color : 'white', fontSize : '2.4rem'}}>waiting for?</label>
                        </div>

                        <div className = 'row' style = {{ display : 'flex', flexDirection : 'row', marginTop : 20}}>
                            <label className = 'avenir-black' style = {{ color : 'white', fontSize : '1.8rem', marginRight : 10}}>Lorem ipsum placeholder</label>
                            <label className = 'avenir-roman' style = {{ color : '#8ACEF4', fontSize : '1.8rem'}}>some sort of description text goes here</label>
                        </div>

                        <div className = 'roundedbutton-join'>
                            <label className = 'mb-0 avenir-roman' style = {{ color : 'white', fontSize : '1.3rem' }} >Join Now</label>
                        </div>
                    </div>

                    <div className = 'row footer'>
                        <div className = 'copyright-label'>
                            <label className = 'avenir-roman' style = {{ color : '#5A6469', marginBottom : 0, fontSize : '1.2rem', marginRight : 10 }}>Copyright 2017 - </label>
                            <label className = 'avenir-roman' style = {{ color : '#D1D1D1', marginBottom : 0, fontSize : '1.2rem', marginRight : 10 }}>info@slipstream.io</label>
                        </div>
                        <div className = 'social-links'>
                            <label className = 'avenir-roman' style = {{ color : '#D1D1D1', marginBottom : 0, fontSize : '1.2rem', marginRight : 30 }}>[Social Links]</label>
                        </div>
                        <div className = 'help-label'>
                            <label className = 'avenir-roman' style = {{ color : '#D1D1D1', marginBottom : 0, fontSize : '1.2rem', marginRight : 30 }}>Terms of Use</label>
                            <label className = 'avenir-roman' style = {{ color : '#D1D1D1', marginBottom : 0, fontSize : '1.2rem', marginRight : 30 }}>Documentation</label>
                            <label className = 'avenir-roman' style = {{ color : '#D1D1D1', marginBottom : 0, fontSize : '1.2rem', marginRight : 30 }}>Help Desk</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InitialScreen