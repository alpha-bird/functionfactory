import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { thinUp } from 'react-icons-kit/entypo/thinUp';
import { thinDown } from 'react-icons-kit/entypo/thinDown';

import { connect } from 'react-redux';
import { vote_up_request, vote_down_request } from '../../redux/actions/app_actions';
import './styles.scss';
class CommentComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inner : this.props.data,
            parentId : this.props.parentId
        }
    }

    /*voteAnswerUp(name, parentId) {

        let send = {};
        send.name = postId;
        send.postId = postId;

        this.myAxios.post( this.owApi+'/namespaces/whisk.system/actions/update_es_rating_up?blocking=true', JSON.stringify(send) )
            .then((response) => {
                console.log(response);
                this.setState({lastActivationData: response.data});
            });

    }*/

    addCode (name) {
      // Add selected action to editor
      let cursor = this.props.aceEditor.getCursorPosition().row
      this.props.aceEditor.session.insert( {column:0, row:cursor + 1}, "\n" );
      let func = 'params = ssCall("'+name+'", params)';
      //let func = 'params = ssCall("whisk.system/'+name+'", params)';
      this.props.aceEditor.session.insert( { column:1, row:cursor + 1 }, func );
      this.props.aceEditor.session.insert( { column:0, row:cursor + 1 }, "    " );
    }

    render () {
        return (
            <div className = 'row commentContainer'>
                <div className = 'col-3 col-xl-1 col-lg-2 col-md-2 col-sm-2 commentSpace'>
                </div>

                <div className = 'row col-8 col-xl-10 col-lg-9 col-md-9 col-sm-9' style = {{ padding : 0 }}>
                    {/* Vote */}
                    <div className = 'col-3 col-xl-1 col-lg-2 col-md-2 col-sm-2 commentVoteContainer'>
                        <div className = 'commentvoteUp' >
                            <Icon
                                icon = { thinUp }
                                size = { 25 }
                                className = 'clickable'
                                onClick = {() => {
                                  console.log('PARENT', this.state.parentId);
                                  this.props.voteUp([this.state.inner._id, this.state.parentId])
                                /*this.votePostUp(this.state.inner._id) */
                                }} />
                        </div>
                        <div className = 'commentvotenumber'>
                            <label className = 'commentvotenumbertext' >{ this.state.inner._source.rating }</label>
                        </div>
                        <div className = 'commentvoteDown'>
                            <Icon
                                icon = { thinDown }
                                size = { 25 }
                                style = {{ cursor : 'pointer' }}/>
                        </div>
                    </div>

                    {/* Comment Main Content */}
                    <div className = 'col-9 col-xl-11 col-lg-10 col-md-10 col-sm-10 comments'>
                        <label className = 'commentText' > { this.state.inner._source.text } </label> <br/>
                        <div className = 'componentBox' >
                            <div>
                                <label className = 'componentName' >{ this.state.inner._source.name }</label> <br/>
                                <label className = 'componentType' >Python</label>
                            </div>
                            <div className = 'componentControllers'>
                                <label className = 'inspect' >INSPECT</label>
                                <div className = 'add'>
                                    <label onClick = {() =>{ this.addCode(this.state.inner._source.name) }} style = {{color : 'white', fontSize : '1.2rem', margin : 0}}>Add</label>
                                </div>
                            </div>
                        </div>
                        <div className = 'row additionInfor commentAddition'>
                            <div style = {{ display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                                <div className = 'nav-avatar commentAvatar' >
                                    <label className = 'nav-avatar-name'>DG</label>
                                </div>
                                <label className = 'commentUserName'> UserName </label>
                            </div>
                            <label className = 'commentReply'> Reply </label>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return {
        dispatch,
        voteUp : (index) => dispatch(vote_up_request(index)),
        voteDown : (index) => dispatch(vote_down_request(index)),
      }
    }

function mapStateToProps(state) {
	return {
        aceEditor : state.global.codeEditor
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
//export default CommentComponent;
