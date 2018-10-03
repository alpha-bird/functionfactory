import React, { Component } from 'react'
import { connect } from 'react-redux';

import QuestionComponent from '../../../components/questioncomponent';
import AskForm from '../../../components/askcomponent';

import './styles.scss';
class RightPanel extends Component {

    constructor( ) {
		super();

		this.state = {
			ask: 'false',
			list: null,
			searchString: 'type here',
		};

    this.toggleAskQuestion = this.toggleAskQuestion.bind(this);
    }

	renderPages () {
		/*
		var pages_data = this.getData(0);

		let pageList = pages_data.map(
			( row, i ) => {
				let inner = pages_data[i];

				return (
					<PageComponent key = { i } index = { i } data = { inner }
									clickEvent = { () => this.addCode(inner._source.name) } />
				);
			}
		);

		return pageList;
		*/
	}

	renderAnswers () {
		/*
		var answers_data = this.getData(2);

		let answerList = answers_data.map(
			( row, i ) => {
				let inner = answers_data[i];
				return (
					<AnswerComponent key = { i } index = { i } data = { inner }
									clickEvent = { () => this.addCode(inner._source.name) } />
				);
			}
		);

		return answerList;
		*/
	}

	renderQuestions ( ) {
		var questions_data = this.props.questions_data;

		let questionList = questions_data.map(
			( row, i ) => {
				let inner = questions_data[i];

				return (
					<QuestionComponent
						key = { i }
						index = { i }
						data = { inner }
						/>
				)
			}
		);

		return questionList;
	}

  toggleAskQuestion() {
    let isAskShowed = this.state.ask;
    //console.log("DEFAULT");
    this.setState({
      newAsk : []
    });

    if( !isAskShowed )
    {
      //this.getRatings(this.props.data._id);
      console.log("SHOWED");
    }
    this.setState({ask: !isAskShowed })
    //this.props.SetCommentStatus(this.props.index, !isCommentShowed);
  }

  renderAskQuestion() {
    let isAskShowed = this.state.ask;

    //if( isCommentShowed && this.state.comments.hits !== undefined){
    if( !isAskShowed ){
			//let comments_data = this.state.comments.hits;

			return (
					<AskForm className />
			)
		}
	}

    render () {
        return (
			<div className = 'rightpanel'>
				<div className = 'resultHeaderContainer'>
					<label className = 'resultHeaderTitle1' >203 RESULTS FOR LOREMIPSUM</label>
                    <label className = 'resultHeaderTitle2 clickable'
                        onClick = { this.toggleAskQuestion } >ASK A QUESTION</label>
				</div>

                <div className = 'results'>
                    {
                    this.renderAskQuestion()
                    }
                </div>
                
				<div className = 'results'>
					{
						this.renderQuestions()
					}
				</div>
			</div>
		);
    }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

function mapStateToProps(state) {
	return {
		questions_data : state.global.postsData,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
