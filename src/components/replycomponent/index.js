import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { postReply_Request, load_component_request } from '../../redux/actions/app_actions';

import './styles.scss';
class ReplyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            selectedComponent : '',
            output: ''
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
        //Sets selected component

        //this.setState({
        //    selectedComponent : this.props.componentData.actions[0]
        //})
    }

    componentWillMount() {
        let ns = {group: 'whisk.system', ns: 'public'};
        this.props.LoadComponent(ns);
    }

    renderDropDownList() {
        if( this.props.componentData.actions !== undefined ) {
          let cptData = this.props.componentData.actions;
          let cptNamespace = this.props.componentData.name;
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
                                    selectedComponent : component,
                                    namespace: cptNamespace
                                });
                            } }>
                            <label className = 'header-drop-item1' > { tpsz[0] } </label>
                            <label className = 'header-drop-item2' > { cptNamespace+'/'+component.name }</label>
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
      this.setState({output: event.target.value});
    }

    render () {
        return (
            <div className = 'row replyContainer'>
                <div className = 'col-3 col-xl-1 col-lg-2 col-md-2 col-sm-2' style = {{ marginLeft : 20}}>
                </div>
                <div className = 'col-8 col-xl-10 col-lg-9 col-md-9 col-sm-9 reply'>
                    <textarea
                        className="form-control replyEntry"
                        placeholder = 'Reply here'
                        value = { this.state.output}
                        onChange={this.handleChange}>
                    </textarea>

                    <div className = 'replyControl'>
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
                            //name: this.state.selectedComponent.name,
                            name: this.state.namespace+'/'+this.state.selectedComponent.name,
                            desc: this.state.output,
                            parentId: this.props.parentId
                          };
                          console.log("POST REPLY:", send);
                          this.props.postReply(send);
                          //console.log("POST REPLY:", this.state.selectedComponent.name, this.state.output, this.props.parentId);
                          }} style = {{ margin : 0 }}>Post Reply</label>
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
        postReply : ( send ) => dispatch( postReply_Request(send) ),
        LoadComponent : (type) => dispatch( load_component_request(type) ),
	};
}

function mapStateToProps(state) {
	return {
        componentData : state.global.publicComponents,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComponent);
