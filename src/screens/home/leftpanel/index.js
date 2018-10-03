import React, { Component } from 'react'
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import { load_codeReq, es_queryReq, set_code, set_code_editor, set_run_block } from '../../../redux/actions/app_actions';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/xcode';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import './styles.scss';
class LeftPanel extends Component {
    constructor() {
        super();
        
        this.state = { 
			search : '',
			lastActivationId: '42afb9b11af64c89b4a92e51503a31ad', 
			lastActivationData: '', 
			action: 'tutorial', 
			lastActivationLogs: '' 
        };

        this.onChange = this.onChange.bind(this);
		//this.Submit = this.Submit.bind(this);
		//this.Save = this.Save.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		//this.getData = this.getData.bind(this);
		//this.getLogs = this.getLogs.bind(this);
		//this.Ask = this.Ask.bind(this);
    }
	
    componentDidMount () {
		this.props.set_editor(this.refs.ace.editor);
    }
    
    onChange(newValue) {
		console.log('Changed');
		this.props.set_codeChange(newValue);
		this.props.SetRunBlock(true);
	}

// Get content of selected line 
	onSelectChange(selectValue) {
		let cursor = selectValue.getCursor().row;
        let search = selectValue.doc.$lines[cursor];
        
        console.log(search);
        
		if (search !== this.state.search) {
			this.props.es_query(search);
			
			this.setState( {
				search : search
			});
		}
    }
      
    render () {
        return (
            <div className = 'leftpanel'>
                <div className = 'editor-container'>
                    <AceEditor  className="editor"
                                ref='ace'
                                mode="python"
                                theme="solarized_dark"
                                fontSize='1.3rem'
                                height="string"
                                width="string"
                                defaultValue = 'Code here'
                                onChange={this.onChange}
                                onSelectionChange={ this.onSelectChange }
                                name="editor"
                                editorProps={{$blockScrolling: true}}
                                value={ this.props.code }
                    />
                </div>
                <div className = 'log-container'>
					<textarea 
						className="form-control"
						style = {{ width : '100%', height : '100%', fontSize : '0.9rem' }} 
						placeholder = 'Output here' 
						value = { this.props.output}>
					</textarea>
                </div>
				
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch, 
		loadCode : ( act ) => dispatch( load_codeReq( act ) ),
		es_query : ( search ) => dispatch( es_queryReq( search ) ),
		set_codeChange : ( newCode ) => dispatch( set_code(newCode) ),
		set_editor : ( editor ) => dispatch( set_code_editor(editor) ),
		SetRunBlock : ( value ) => dispatch( set_run_block(value) )
	};
}

function mapStateToProps(state) {
	return { 
		codeData : state.global.codeData ,
		code : state.global.code,

		componentData : state.global.components,
		output : state.global.Output
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);