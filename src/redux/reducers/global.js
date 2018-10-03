import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import ActionTypes from '../actions/action_types';

const initialState = Immutable({
    esData : [],

    pagesData : [],
    postsData : [],
    answersData : [],

    question_comment_status : [],

    codeData : [],
    code : '',

    Output : '',

    isRunBlock : false,

    codeEditor : undefined,

    components : [],
    publicComponents : [],
    selectedComponentName : [],

    postReplyResult : [],

    postQuestionResult : [],

    comments: []
});

function getData( ttData, index ) {
    var pagesData = [ ];
    var answerData = [ ];
    var questionData = [ ];

    if ( ttData ) {
        let libraries = ttData;

        for(let i = 0; i < libraries.length; i ++) {
            var inner = libraries[i];

            if(inner._type === 'page') {
                pagesData.push(inner);
            }
            if (inner._type === 'post') {
                questionData.push(inner);
            }
            else {
                answerData.push(inner);
            }
        }
    }
    if( index === 0 ) {
        return pagesData;
    }
    if( index === 1 ) {
        return questionData;
    }
    if( index === 2 ) {
        return answerData;
    }
}

function formatOutput (data) {

    let outPut = '-------------------output here-------------------\n';
    outPut += ( 'Name : ' + data.name + '\n')
    outPut += ( 'Logs : ' + JSON.stringify(data.logs) + '\n \n');
    outPut += ( 'Response : \n' );
    outPut += ( '            Status : ' + data.response.status + '\n');
    outPut += ( '            Result : ' + JSON.stringify(data.response.result) + '\n');
    outPut += ( '            Duration : ' + JSON.stringify(data.duration) + '\n \n');
    outPut += ( 'LastActivationID : ' + data.activationId + '\n \n' );

    return outPut;
}

const CodeLoading_Success = function( state, action ) {
    return ({
        ...state,
        codeData : action.data,
        code : action.data.exec.code,
        isRunBlock : false
    });
}

const SetCodeEditor = function( state, action ) {
    return ({
        ...state,
        codeEditor : action.editor
    })
}

const SetCode_Change = function ( state, action ) {
    return ({
        ...state,
        code : action.code
    });
}

const ESQuery_Success = function ( state, action ) {
    let pgData = getData(action.esData.hits, 0);
    let ptData = getData(action.esData.hits, 1);
    let ansData = getData(action.esData.hits, 2);

    let cm_status = [];
    for(let i = 0; i < ansData.length ;i ++ ){
        cm_status.push(false);
    }

    return ({
        ...state,
        esData : action.esData,

        pagesData : pgData,
        postsData : ptData,
        answersData : ansData,

        question_comment_status : cm_status
    });
};

const Set_QS_Comment_Status = function ( state, action ) {
    let temp = state.question_comment_status;
    temp[action.index] = action.value;

    return ({
        ...state,
        question_comment_status : temp
    });
}

const ComponentLoading_Success = function ( state, action ) {
    return ({
        ...state,
        components : action.data
    });
}

const PublicComponentLoading_Success = function ( state, action ) {
    return ({
        ...state,
        publicComponents : action.data
    });
}

const SetComponentSelect = function ( state, action ) {
    return ({
        ...state,
        selectedComponentName : action.componentName
    });
}

const SetOutput = function ( state, action ) {
    return ({
        ...state,
        Output : action.out
    });
}

const SetRunBlock = function ( state, action ) {
    return ({
        ...state,
        isRunBlock : action.blockValue
    });
}

const PostReplySuccess = function ( state, action ) {
    return ({
        ...state,
        postReplyResult : action.data
    })
}

const PostReplyFailed = function ( state, action ) {
    return ({
        ...state,
        postReplyResult : -1
    })
}

const PostQuestionSuccess = function ( state, action ) {
    return ({
        ...state,
        postQuestionResult : action.data
    })
}

const PostQuestionFailed = function ( state, action ) {
    return ({
        ...state,
        postQuestionResult : -1
    })
}

const CodeRun_Success = function( state, action ) {

    let output = formatOutput(action.data);

    return ({
        ...state,
        //runResponse : action.data
        Output : output
        //codeData : action.data,
        //code : action.data.exec.code,
        //isRunBlock : false
    });
}

const CodeRun_Failed = function( state, action ) {
    let output = formatOutput(action.data.response.data);

    return ({
        ...state,
        //runResponse : action.data
        Output : output
        //codeData : action.data,
        //code : action.data.exec.code,
        //isRunBlock : false
    });
}

const LoadComments_Success = function ( state, action ) {
    return ({
        ...state,
        comments : action.data
    })
}

const LoadComments_Failed = function ( state, action ) {
    return ({
        ...state,
        comments : -1
    })
}

const SaveCode_Success = function ( state, action ) {
    return ({
        ...state,
        saveCodeState : action.data
    })
}

const SaveCode_Failed = function ( state, action ) {
    return ({
        ...state,
        saveCodeState : -1
    })
}

const SaveCodePublic_Success = function ( state, action ) {
    return ({
        ...state,
        saveCodePublicState : action.data
    })
}

const SaveCodePublic_Failed = function ( state, action ) {
    return ({
        ...state,
        saveCodePublicState : -1
    })
}

const actionHandlers = {
    [ActionTypes.SET_CODE_DATA]: SetCode_Change,
    [ActionTypes.LOAD_CODE_SUCCESS]: CodeLoading_Success,
    [ActionTypes.ES_QUERY_SUCCESS]: ESQuery_Success,
    [ActionTypes.SET_QUESTION_COMMENT_STATUS] : Set_QS_Comment_Status,
    [ActionTypes.LOAD_COMPONENT_SUCCESS] : ComponentLoading_Success,
    [ActionTypes.LOAD_PUBLIC_COMPONENT_SUCCESS] : PublicComponentLoading_Success,
    [ActionTypes.SET_CODE_EDITOR] : SetCodeEditor,
    [ActionTypes.SET_COMPONENT_SELECTION] : SetComponentSelect,
    [ActionTypes.SET_OUTPUT] : SetOutput,
    [ActionTypes.SET_RUN_BLOCK] : SetRunBlock,
    [ActionTypes.POST_REPLY_SUCCESS] : PostReplySuccess,
    [ActionTypes.POST_REPLY_FAILED] : PostReplyFailed,
    [ActionTypes.POST_QUESTION_SUCCESS] : PostQuestionSuccess,
    [ActionTypes.POST_QUESTION_FAILED] : PostQuestionFailed,
    [ActionTypes.RUN_CODE_SUCCESS]: CodeRun_Success,
    [ActionTypes.RUN_CODE_FAILED]: CodeRun_Failed,
    [ActionTypes.LOAD_COMMENTS_SUCCESS]: LoadComments_Success,
    [ActionTypes.LOAD_COMMENTS_FAILED]: LoadComments_Failed,
    [ActionTypes.SAVE_CODE_SUCCESS]: SaveCode_Success,
    [ActionTypes.SAVE_CODE_FAILED]: SaveCode_Failed,
    [ActionTypes.SAVE_CODE_PUBLIC_SUCCESS]: SaveCodePublic_Success,
    [ActionTypes.SAVE_CODE_PUBLIC_FAILED]: SaveCodePublic_Failed,
}

export default createReducer(initialState, actionHandlers);
