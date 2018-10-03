import  ActionTypes  from './action_types';

//Loding Code with( Act name and Editor )
export const load_codeReq = ( act ) => ({
	type : ActionTypes.LOAD_CODE_REQUEST, act,
});

export const load_codeSuccess = ( state ) => ({
	type : ActionTypes.LOAD_CODE_SUCCESS, state
});

export const load_codeFailed = ( state ) => ({
	type : ActionTypes.LOAD_CODE_FAILED, state
});

//Query
export const es_queryReq = ( search ) => ({
	type : ActionTypes.ES_QUERY_REQUEST, search
});

export const es_querySuccess = ( state ) => ({
	type : ActionTypes.ES_QUERY_SUCCESS, state
});

export const es_queryFailed = ( state ) => ({
	type : ActionTypes.ES_QUERY_FAILED, state
});

//Set code when code change
export const set_code = ( code ) => ({
	type : ActionTypes.SET_CODE_DATA, code
});

//
export const set_question_comment_status = ( index, value ) => ({
	type : ActionTypes.SET_QUESTION_COMMENT_STATUS, index, value
});

//Loading components
export const load_component_request = ( state ) => ({
	type : ActionTypes.LOAD_COMPONENT_REQUEST, state
});

export const load_component_success = ( state ) => ({
	type : ActionTypes.LOAD_COMPONENT_SUCCESS, state
});

export const load_public_component_success = ( state ) => ({
	type : ActionTypes.LOAD_PUBLIC_COMPONENT_SUCCESS, state
});


export const load_component_failed = ( state ) => ({
	type : ActionTypes.LOAD_COMPONENT_FAILED, state
});

//Set Code editor

export const set_code_editor = ( editor ) => ({
	type : ActionTypes.SET_CODE_EDITOR, editor
});

//Set Component Selection

export const set_component_selection = ( componentName ) => ({
	type : ActionTypes.SET_COMPONENT_SELECTION, componentName
});

export const set_output = ( out ) => ({
	type : ActionTypes.SET_OUTPUT, out
});

export const set_run_block = ( blockValue ) => ({
	type : ActionTypes.SET_RUN_BLOCK, blockValue
});

//Post Reply

export const postReply_Request = ( send ) => ({
	type : ActionTypes.POST_REPLY_REQUEST, send
});

export const postReply_Success = ( state ) => ({
	type : ActionTypes.POST_REPLY_SUCCESS, state
});

export const postReply_Failed = ( state ) => ({
	type : ActionTypes.POST_REPLY_FAILED, state
});

//Post Question

export const postQuestion_Request = ( send ) => ({
	type : ActionTypes.POST_QUESTION_REQUEST, send
});

export const postQuestion_Success = ( state ) => ({
	type : ActionTypes.POST_QUESTION_SUCCESS, state
});

export const postQuestion_Failed = ( state ) => ({
	type : ActionTypes.POST_QUESTION_FAILED, state
});

// Run Code Component

export const run_code_request = ( state ) => ({
	type : ActionTypes.RUN_CODE_REQUEST, state
});

export const run_code_success = ( state ) => ({
	type : ActionTypes.RUN_CODE_SUCCESS, state
});

export const run_code_failed = ( state ) => ({
	type : ActionTypes.RUN_CODE_FAILED, state
});

export const load_comments_request = ( state ) => ({
	type : ActionTypes.LOAD_COMMENTS_REQUEST, state
});

export const load_comments_success = ( state ) => ({
	type : ActionTypes.LOAD_COMMENTS_SUCCESS, state
});

export const load_comments_failed = ( state ) => ({
	type : ActionTypes.LOAD_COMMENTS_FAILED, state
});

export const save_code_request = ( state ) => ({
	type : ActionTypes.SAVE_CODE_REQUEST, state
});

export const save_code_success = ( state ) => ({
	type : ActionTypes.SAVE_CODE_SUCCESS, state
});

export const save_code_failed = ( state ) => ({
	type : ActionTypes.SAVE_CODE_FAILED, state
});

export const save_code_public_request = ( state ) => ({
	type : ActionTypes.SAVE_CODE_PUBLIC_REQUEST, state
});

export const save_code_public_success = ( state ) => ({
	type : ActionTypes.SAVE_CODE_PUBLIC_SUCCESS, state
});

export const save_code_public_failed = ( state ) => ({
	type : ActionTypes.SAVE_CODE_PUBLIC_FAILED, state
});

export const vote_up_request = ( state ) => ({
	type : ActionTypes.VOTE_UP_REQUEST, state
});

export const vote_down_request = ( state ) => ({
	type : ActionTypes.VOTE_DOWN_REQUEST, state
});
