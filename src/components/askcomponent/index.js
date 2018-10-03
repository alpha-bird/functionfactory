import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { postQuestion_Request } from '../../redux/actions/app_actions';

import './styles.scss';

class AskComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            selectedComponent : '',
            output: '',
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.setState({
            selectedComponent : this.props.componentData.actions[0]
        })
    }

    renderDropDownList() {
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
                            style = {{ width : '100%'}}
                            key = { i }
                            onClick = { () => {
                                this.setState({
                                    selectedComponent : component
                                });
                            } }>
                            <label className = 'header-drop-item1' > { tpsz[0] } </label>
                            <label className = 'header-drop-item2' > { component.name }</label>
                        </button>
                    )
                }
            )
            return dropdownList;
        }
        else {
            return undefined;
        }
    }

    handleChange(event) {
      //this.setState({output: event.target.value});
      let name = event.target.name;
      this.setState({[name]: event.target.value});
    }

    render () {
        return (
            <div className = 'row askContainer'>
                <div className = 'col-3 col-xl-1 col-lg-2 col-md-2 col-sm-2' style = {{ marginLeft : 20}}>
                </div>
                <div className = 'col-8 col-xl-10 col-lg-9 col-md-9 col-sm-9 ask'>

                    <textarea
                        name="title"
                        className="form-control askTitle"
                        placeholder = 'Question title'
                        value = { this.state.title }
                        onChange={this.handleChange}>
                    </textarea>

                    <textarea
                        name="output"
                        className="form-control askEntry"
                        placeholder = 'Question body'
                        value = { this.state.output }
                        onChange={this.handleChange}>
                    </textarea>

                    <div className = 'askControl'>
                        <label
                            className = 'clickable'
                            style = {{ margin : 0 }}
                            onClick = { () => {
                                this.toggleModal();
                            }}>
                            +Add component
                        </label>

                        <label className = 'clickable' onClick = { () => {
                          let send = {
                            name: this.state.selectedComponent.name,
                            title: this.state.title,
                            desc: this.state.output
                          };
                          console.log("POST QUESTION:", send);
                          this.props.postQuestion(send);
                          //console.log("POST REPLY:", this.state.selectedComponent.name, this.state.output, this.props.parentId);
                        }} style = {{ margin : 0 }}>Post Question</label>
                    </div>
                </div>

                {/* Dialog */}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className = 'cus-modal-dialog' contentClassName = 'cus-modal-content'>
                    <ModalHeader toggle={this.toggleModal} >Add Component</ModalHeader>

                    <ModalBody className = 'cus-modal-body' style = {{ padding : 30 }}>
                        <div className = 'row' style = {{ margin : 0, width : '100%' }}>
                            <label>ADD FROM YOUR LIBRARY</label>

                            <div className="dropdown" style = {{ width : '100%', marginTop : 15 }} >
                                <div
                                    className="dropdown-toggle nav-dropdown-label header-label"
                                    style = {{ backgroundColor : 'white'}}
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false" >
                                    {
                                        this.state.selectedComponent.name
                                    }
                                </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2" style = {{ width : '100%'}}>
                                    {
                                        this.renderDropDownList()
                                    }
                                </div>
                            </div>
                        </div>

                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%' }}>
                            <label>ADD FROM PUBLIC LIBRARY</label>
                            <div className = 'row' style = {{ margin : 0, width : '100%', marginTop : 20 }}>
                                <input type="text" placeholder = 'Search Library' className="form-control com-searchbar" />
                            </div>
                        </div>

                        <div className = 'row' style = {{ margin : 0, marginTop : 30, width : '100%'}}>
                        </div>
                    </ModalBody>

                    <ModalFooter className = 'cus-modal-footer '>
                        <div className = 'row' style = {{ display : 'flex', justifyContent : 'space-between', width : '100%', margin : 0}}>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { this.toggleModal }>CANCEL</label>
                            <label style = {{ margin : 0 }} className = 'clickable' onClick = { this.toggleModal }>ADD COMPONENT</label>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return {
        dispatch,
        postQuestion : ( send ) => dispatch( postQuestion_Request(send) ),
	};
}

function mapStateToProps(state) {
	return {
        componentData : state.global.components,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AskComponent);
