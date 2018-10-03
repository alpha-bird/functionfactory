import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit';
import { ic_play_arrow } from 'react-icons-kit/md/ic_play_arrow';
import { ic_share } from 'react-icons-kit/md/ic_share';
import { code } from 'react-icons-kit/fa/code';
import { logout } from 'react-icons-kit/ikons/logout';

import { load_codeReq, load_component_request, set_component_selection, set_output, set_run_block, run_code_request, save_code_request, save_code_public_request } from '../../../redux/actions/app_actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './styles.scss';
class Header extends Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            modalShare: false,
            modalNew: false,
            message: '',
            group: 'private',
            newName: '',
            newType: 'python'
        };

        this.toggle = this.toggle.bind(this);
        this.toggleShare = this.toggleShare.bind(this);
        this.toggleNew = this.toggleNew.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    toggleShare() {
        this.setState({
          modalShare: !this.state.modalShare
        });
    }

    toggleNew() {
        this.setState({
          modalNew: !this.state.modalNew
        });
    }

    componentWillMount() {
        let ns = {group: 'private', ns: '_'};
        this.props.LoadComponent(ns);
    }

    Share() {
      this.toggleShare();
    }

    Save() {
		let send = this.props.codeObject;
    send.name = this.props.selectedComponent.name;
		send.exec.code = this.props.currentCode;
		send.exec.kind = this.props.selectedComponent.annotations[0].value;

    this.props.SaveCode(send);

    this.setState({
            message : 'Script saved!!'
            });
    this.toggle();
  	}

    SaveNew() {
    let send = this.props.codeObject;
    send.name = this.state.newName;
    send.exec.code = '';
    send.exec.kind = this.state.newType;
    console.log("Save new", send);
    this.props.SaveCode(send);
    this.toggleNew();
    }

    SavePublic() {
    let send = this.props.codeObject;
    send.name = this.props.selectedComponent.name;
    send.exec.code = this.props.currentCode;
    send.exec.kind = this.props.selectedComponent.annotations[0].value;

    console.log("SavePublic", send);
    this.props.SaveCodePublic(send);
    this.setState({
            message : 'Script saved to public'
            });
    }

    Run() {
        if ( !this.props.isRunBlock ) {
          this.props.RunCode(this.props.selectedComponent.name);
        }
        else {
            console.log('Run after saving the code!');
            this.setState({
                message : 'Please run this script after saving code!'
            });
            this.toggle();

        }
    }

    renderCompDropDownList() {
        if( this.props.componentData.actions !== undefined ) {
            let cptData = this.props.componentData.actions;
            let dropdownList = cptData.map(
                ( row, i ) => {
                    let component = cptData[i];
                    let typeandsize = cptData[i].annotations[0].value;

                    let tpsz = typeandsize.split(':');

                    return (
                        <button
                            className="dropdown-item"
                            type="button"
                            key = { i }
                            onClick = { () => {
                                this.props.SetComponentSelect(component);
                                this.props.SetOutput( '' );
                                this.props.LoadCode(component.name);
                            } }>
                            <label className = 'header-drop-item1' > { tpsz[0] } </label>
                            <label className = 'header-drop-item2' > { component.name }</label>
                            <label className = 'header-drop-item3' > { tpsz[1] } KB</label>
                        </button>
                    )
                }
            )
            let createNew = () => {
              return (
                  <button className="dropdown-item" type="button"
                  key = "newAction"
                  onClick = { () => {
                    this.toggleNew();
                  }
                  }>
                  New</button>
                 );
               };
            dropdownList.unshift(createNew());
            return dropdownList;
        }
        else {
            return undefined;
        }
    }

    renderCompSelect () {
        if( this.props.componentData.actions !== undefined && this.props.componentData.actions !== [] ) {
            return (
                <div className="dropdown" >
                    <div
                        className="dropdown-toggle nav-dropdown-label"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false" >
                        { this.props.selectedComponent.name }
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {
                            this.renderCompDropDownList()
                        }
                    </div>
                </div>
            );
        }
        else {
            return undefined;
        }
    }

    setGroup(group) {
      this.setState({group: group});
      let ns = {group: group, ns: '_'};
      this.props.LoadComponent(ns);
    }

    setType(type) {
      console.log(type);
      this.setState({newType: type});
    }

    newComponent() {
      this.setState({
          message : 'New component'
      });
      this.toggle();
    }

    renderGroupSelect () {
      // DISABLED
      //return
/*
      let groups = [];
      groups.push(<button className="dropdown-item" key="privateG" onClick={ () => {this.setGroup('private')}}>private</button>);
      groups.push(<button className="dropdown-item" key="publicG" onClick={ () => {this.setGroup('public')}}>public</button>);

      return (
        <div className="dropdown nav-group" >
            <div
                className="dropdown-toggle nav-dropdown-label header-label"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" >
                {this.state.group}
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                { groups }
            </div>
        </div>
      ); */
    }

    renderTypeSelect () {

      let types = [];
      types.push(<button className="dropdown-item" key="newPython" onClick={ () => {this.setType('python:2')}}>python</button>);
      types.push(<button className="dropdown-item" key="newNodeJS" onClick={ () => {this.setType('nodejs:6')}}>nodejs</button>);

      return (
        <div className="nav-item nav-item2" onClick = { () => { }} style = {{  minWidth : 150 }}>
        <Icon className = 'nav-icon' size = { 24 } icon = { code } />
        <div className="dropdown nav-label" >
            <div
                className="dropdown-toggle nav-dropdown-label"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" >
                {this.state.newType}
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                { types }
            </div>
        </div>
        </div>
      );
    }


    render () {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                  {
                        this.renderGroupSelect()
                  }

                <div className="nav-item" onClick = { () => { } }>
                    {
                        this.renderCompSelect()
                    }
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto mt-lg-0 col-6">
                        <div className="nav-item-header nav-item1" onClick = { () => { this.Save(); }} >
                            <Icon className = 'nav-icon' size = { 24 } icon = { ic_mode_edit } />
                            <label className = 'nav-label' >Save</label>
                        </div>

                        <div className="nav-item-header nav-item2" onClick = { () => { this.Run(); }}>
                            <Icon className = 'nav-icon' size = { 24 } icon = { ic_play_arrow } />
                            <label className = 'nav-label' >Run</label>
                        </div>

                        <div className="nav-item-header nav-item2" onClick = { () => { this.Share(); }}>
                            <Icon className = 'nav-icon' size = { 24 } icon = { ic_share } />
                            <label className = 'nav-label' >Share</label>
                        </div>


                    </div>

                    <div className="navbar-nav mr-auto col-6" style = {{ display : 'flex', justifyContent : 'flex-end'}}>
                        <div className="nav-item-header nav-item2" onClick = { () => { }}>
                            <Icon className = 'nav-icon' size = { 24 } icon = { logout } />
                        </div>

                        <div className='nav-item-header nav-item3'>
                            <input type="text" placeholder = 'Search Library' className="form-control nav-searchbar" />
                        </div>

                        <div className = 'nav-item-header nav-item3'>
                            <div className = 'dropdown' >
                                <div className = 'nav-avatar' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    <label className = 'nav-avatar-name'>DG</label>
                                </div>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item" type="button">My profile</button>
                                    <button className="dropdown-item" type="button">Sign out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
                    <ModalBody>
                        {
                            this.state.message
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalShare} toggle={this.toggleShare} className = 'cus-modal-dialog' contentClassName = 'cus-modal-content'>
                    <ModalHeader toggle={this.toggleShare} >Share | Expose</ModalHeader>

                    <ModalBody className = 'cus-modal-body' style = {{ padding : 30 }}>
                        <div className = 'row' style = {{ margin : 0, width : '100%' }}>
                            <label>Copy to your public library</label>
                            <button onClick = { () => { this.SavePublic(); }}>{ this.props.selectedComponent.name }</button>
                        </div>

                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%' }}>
                            <label>Expose to web (allow anonymous access)</label>
                            <div className = 'row' style = {{ margin : 0, width : '100%', marginTop : 20 }}>
                                <input type="text" placeholder = 'Search Library' className="form-control com-searchbar" />
                            </div>
                        </div>

                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%'}}>
                        </div>
                    </ModalBody>

                    <ModalFooter className = 'cus-modal-footer '>
                        <div className = 'row' style = {{ display : 'flex', justifyContent : 'space-between', width : '100%', margin : 0}}>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { this.toggleShare }>CANCEL</label>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { this.toggleShare }>ADD COMPONENT</label>
                        </div>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalNew} toggle={this.toggleNew} className = 'cus-modal-dialog' contentClassName = 'cus-modal-content'>
                    <ModalHeader toggle={this.toggleNew} >Create New Component</ModalHeader>

                    <ModalBody className = 'cus-modal-body' style = {{ padding : 30 }}>
                    <label>Component Name</label>
                    <label style = {{ marginLeft : 50 }}>Type</label>
                        <div className = 'row' style = {{ margin : 0, width : '100%' }}>
                        <input type="text"
                            className="form-control com-searchbar"
                            placeholder = 'Component name'
                            name = "newName"
                            value = { this.state.newName }
                            onChange={this.handleChange}>
                        </input>
                        { this.renderTypeSelect() }

                        </div>



                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%' }}>
                            <label>Expose to web (allow anonymous access)</label>
                            <div className = 'row' style = {{ margin : 0, width : '100%', marginTop : 20 }}>
                                <input type="text" placeholder = 'Search Library' className="form-control com-searchbar" />
                            </div>
                        </div>

                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%'}}>
                        </div>
                    </ModalBody>

                    <ModalFooter className = 'cus-modal-footer '>
                        <div className = 'row' style = {{ display : 'flex', justifyContent : 'space-between', width : '100%', margin : 0}}>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { this.toggleNew }>CANCEL</label>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { () => { this.SaveNew(); } }>CREATE</label>
                        </div>
                    </ModalFooter>
                </Modal>

          </nav>
        );
    }
}

function mapDispatchToProps(dispatch) {
	return {
        dispatch,
        LoadComponent : (type) => dispatch( load_component_request(type) ),
        LoadCode : ( actName ) => dispatch( load_codeReq(actName) ),
        SetComponentSelect : ( name ) => dispatch( set_component_selection(name) ),
        SetOutput : ( out ) => dispatch( set_output(out) ),
        SetRunBlock : ( value ) => dispatch( set_run_block(value) ),
        RunCode : ( action ) => dispatch( run_code_request(action) ),
        SaveCode : ( send ) => dispatch( save_code_request(send) ),
        SaveCodePublic : ( send ) => dispatch( save_code_public_request(send) ),
	};
}

function mapStateToProps(state) {
	return {
        componentData : state.global.components,
        selectedComponent : state.global.selectedComponentName,
        codeObject : state.global.codeData,
        isRunBlock : state.global.isRunBlock,
        currentCode : state.global.code
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
