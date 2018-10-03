import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { thinUp } from 'react-icons-kit/entypo/thinUp';
import { thinDown } from 'react-icons-kit/entypo/thinDown';

import CommentItem from '../commentcomponent';
import ReplyForm from '../replycomponent';

import { set_question_comment_status, load_comments_request, vote_up_request, vote_down_request } from '../../redux/actions/app_actions';
import './styles.scss';
class QustionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
			comments : [],

            collapsed : { },
            children : { },
            answer: { },
		}

		this.showComments = this.showComments.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loadcomments !== this.state.comments) {
        if (!this.state.comments.hits) {
          this.setState({ comments: nextProps.loadcomments });
        }
      }
    }

    collapseSubmit (e, id) {
		e.stopPropagation();
		let answer = this.state.answer;
		answer[id] = false;
		this.setState( {answer: answer} );
	}

	expandSubmit (e, id) {
		e.stopPropagation();
		let answer = this.state.answer;
		let description = this.state.description;
		if (answer[id]) {
			console.log('exists');
		}
		else {
			console.log('does notexists');
			answer[id] = true;
			description[id] = 'false';
			this.setState( { answer: answer } );
			this.setState( { answer: answer, description: description } );
		}
	}

	/*handleAnswerChange (id, value) {
		//onChange={(desc) => {this.setState({description[inner._]id: desc.target.value})}}
		let description = this.state.description;
		description[id] = value;
		this.setState( { description: description } );
  }*/

    getRatings (id) {
      this.props.getRatings(this.props.data._id)
      //this.setState({
      //  comments: this.props.loadcomments
      //});
    }

    /*getRatings (id) {
     	this.myAxios.post(this.owApi+'/namespaces/whisk.system/actions/es_get_ratings?blocking=true', { parentId: id })
			.then((response) => {
				console.log(response.data.response.result.hits);
				this.setState({
					comments : response.data.response.result.hits
				});
			});
	}*/

	showComments() {
		let isCommentShowed = this.props.comment_status[this.props.index];

		this.setState({
			comments : []
		});

		if( !isCommentShowed )
		{
      this.getRatings(this.props.data._id);
		}
		this.props.SetCommentStatus(this.props.index, !isCommentShowed);
	}

	renderComments(parentId) {
		let isCommentShowed = this.props.comment_status[this.props.index];

		if( isCommentShowed && this.state.comments.hits !== undefined){
			let comments_data = this.state.comments.hits;
    //if( isCommentShowed && this.props.comments.hits !== undefined){
  		//let comments_data = this.props.comments.hits;

			let comments_list = comments_data.map(
				( row, i ) => {
					let comment = comments_data[i];
					return <CommentItem data = { comment } parentId = {parentId} key = { i }/>
				}
			);
			return (
				<div>
					{
						comments_list
					}
					<ReplyForm parentId = { parentId } />
				</div>
			)
		}
	}

    /*votePostUp(postId) {
		let send = {};
		send.name = postId;
		this.myAxios.post( this.owApi+'/namespaces/whisk.system/actions/update_es_post_up?blocking=true', JSON.stringify(send) )
			.then((response) => {
				console.log(response);
				this.setState({lastActivationData: response.data});
			});
	}*/

	//addCode (name) {
		// Add selected action to editor
		//let cursor = this.props.aceEditor.getCursorPosition().row
		//this.props.aceEditor.session.insert( {column:0, row:cursor + 1}, "\n" );
		//let func = 'params = ssCall("'+name+'", params)';
		//this.props.aceEditor.session.insert( { column:1, row:cursor + 1 }, func );
		//this.props.aceEditor.session.insert( { column:0, row:cursor + 1 }, "    " );
	//}

    render () {
		return (
			<div >
				<div className = 'row questionContainer'>
					<div className = 'col-3 col-xl-1 col-lg-2 col-md-2 col-sm-2 voteContainer'>
						<div className = 'voteUp' >
							<Icon
								className = 'clickable'
								icon = { thinUp }
								size = { 25 }
								onClick = {() => {
                  this.props.voteUp(this.props.data._id)
                  /*this.votePostUp(this.state.inner._id)*/
                   }} />
						</div>
						<div className = 'votenumber'>
							<label className = 'votenumbertext' >{ this.props.data._source.rating }</label>
						</div>
						<div className = 'voteDown'>
							<Icon
								className = 'clickable'
								icon = { thinDown }
								size = { 25 } />
						</div>
					</div>

					<div className = 'col-8 col-xl-10 col-lg-9 col-md-9 col-sm-9 posts'>
						<div
							onClick = { this.showComments }>
							<label className = 'resultTitle clickable' > { this.props.data._source.title } </label> <br/>
							<label className = 'resultText clickable' > { this.props.data._source.text } </label> <br/>
						</div>
						<div className = 'row additionInfor'>
							<label className = 'userName'> { this.props.data._source.name } </label>

							<label className = 'comment clickable'
								onClick = { this.showComments } > 23 Comments
							</label>
						</div>
					</div>
				</div>
				{
					this.renderComments(this.props.data._id)
				}
			</div>
		);
    }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
    SetCommentStatus : (index, value) => dispatch(set_question_comment_status(index, value)),
    getRatings : (index) => dispatch(load_comments_request(index)),
    voteUp : (index) => dispatch(vote_up_request(index)),
		voteDown : (index) => dispatch(vote_down_request(index)),
	};
}

function mapStateToProps(state) {
	return {
		aceEditor : state.global.codeEditor,
    comment_status : state.global.question_comment_status,
		loadcomments : state.global.comments,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QustionComponent);
