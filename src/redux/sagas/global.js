import { put, call, takeEvery } from 'redux-saga/effects';
//fork, takeLatest
import ActionTypes from '../../redux/actions/action_types';
import { getEsQuery, loadCode, loadComponent, postReply, postQuestion, runCode, getRatings, saveCode, saveCodePublic, voteUp, voteDown } from '../../api/server_apis';

function* runGetESQuery(action) {
    try {
        const loaded = yield call( () => getEsQuery(action.search) );

        yield put(
            {
                type: ActionTypes.ES_QUERY_SUCCESS,
                esData : loaded
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.ES_QUERY_FAILED,
                payload: {
                    error,
                },
            }
        );
    }
}

function* runLoadingCode(action) {
    try {
        console.log(action);
        const loaded = yield call( () => loadCode(action.act) );

        yield put(
            {
                type : ActionTypes.LOAD_CODE_SUCCESS,
                data : loaded,
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.LOAD_CODE_FAILED,
                payload: {
                    error,
                },
            }
        );
    }
}

function* runLoadingComponent( action ) {
    try {
        const loaded = yield call( () => loadComponent(action.state) );

        if(action.state.ns === 'public') {
          yield put(
              {
                  type : ActionTypes.LOAD_PUBLIC_COMPONENT_SUCCESS,
                  data : loaded,
              }
          );

        } else {

        yield put(
            {
                type : ActionTypes.LOAD_COMPONENT_SUCCESS,
                data : loaded,
            }
        );

        if( loaded.actions !== undefined && loaded.actions !== [] ) {
            yield put(
                {
                    type : ActionTypes.SET_COMPONENT_SELECTION,
                    componentName : loaded.actions[0]
                }
            );

            yield put(
                {
                    type : ActionTypes.LOAD_CODE_REQUEST,
                    act : loaded.actions[0].name
                }
            );
          }
        }
    } catch (error) {
        yield put(
            {
                type: ActionTypes.LOAD_COMPONENT_FAILED,
                payload: {
                    error,
                },
            }
        );
    }
}

function* runPostReply ( action ) {
    try {
        const loaded = yield call( () => postReply(action.send) );

        yield put(
            {
                type: ActionTypes.POST_REPLY_SUCCESS,
                data : loaded
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.POST_REPLY_FAILED,
                payload: {
                    error,
                },
            }
        );
    }
}

function* runPostQuestion ( action ) {
    try {
        const loaded = yield call( () => postQuestion(action.send) );

        yield put(
            {
                type: ActionTypes.POST_QUESTION_SUCCESS,
                data : loaded
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.POST_QUESTION_FAILED,
                payload: {
                    error,
                },
            }
        );
    }
}

function* runRunCode(action) {
    try {
        const loaded = yield call( () => runCode(action) );

        yield put(
            {
                type : ActionTypes.RUN_CODE_SUCCESS,
                data : loaded,
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.RUN_CODE_FAILED,
                data: error,
            }
        );
    }
}

function* runLoadComments(action) {
    try {
        const loaded = yield call( () => getRatings(action) );

        yield put(
            {
                type : ActionTypes.LOAD_COMMENTS_SUCCESS,
                data : loaded,
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.LOAD_COMMENTS_FAILED,
                data: error,
            }
        );
    }
}

function* runSaveCode(action) {
    try {
        const saved = yield call( () => saveCode(action) );

        yield put(
            {
                type : ActionTypes.SET_RUN_BLOCK,
                data : false,
            }
        );

        yield put(
            {
                type : ActionTypes.SAVE_CODE_SUCCESS,
                data : saved,
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.SAVE_CODE_FAILED,
                data: error,
            }
        );
    }
}

function* runSaveCodePublic(action) {
    try {
        const saved = yield call( () => saveCodePublic(action) );

        yield put(
            {
                type : ActionTypes.SAVE_CODE_PUBLIC_SUCCESS,
                data : saved,
            }
        );
    } catch (error) {
        yield put(
            {
                type: ActionTypes.SAVE_CODE_PUBLIC_FAILED,
                data: error,
            }
        );
    }
}

function* runVoteUp(action) {
    try {
        const voted = yield call( () => voteUp(action) );
        console.log("VOTED SUCCESS", voted);

        //yield put(
        //    {
        //        type : ActionTypes.SAVE_CODE_PUBLIC_SUCCESS,
        //        data : saved,
        //    }
        //);
    } catch (error) {
      console.log("VOTED FAILED", error);
        //yield put(
        //    {
        //        type: ActionTypes.SAVE_CODE_PUBLIC_FAILED,
        //        data: error,
        //    }
        //);
    }
}

function* runVoteDown(action) {
    try {
        const voted = yield call( () => voteDown(action) );
        console.log("VOTED SUCCESS", voted);

        //yield put(
        //    {
        //        type : ActionTypes.SAVE_CODE_PUBLIC_SUCCESS,
        //        data : saved,
        //    }
        //);
    } catch (error) {
      console.log("VOTED FAILED", error);
        //yield put(
        //    {
        //        type: ActionTypes.SAVE_CODE_PUBLIC_FAILED,
        //        data: error,
        //    }
        //);
    }
}

const RunGlobalSaga = function*() {
    yield takeEvery( ActionTypes.LOAD_CODE_REQUEST, runLoadingCode );
    yield takeEvery( ActionTypes.ES_QUERY_REQUEST, runGetESQuery );
    yield takeEvery( ActionTypes.LOAD_COMPONENT_REQUEST, runLoadingComponent );
    yield takeEvery( ActionTypes.POST_REPLY_REQUEST, runPostReply);
    yield takeEvery( ActionTypes.POST_QUESTION_REQUEST, runPostQuestion);
    yield takeEvery( ActionTypes.RUN_CODE_REQUEST, runRunCode );
    yield takeEvery( ActionTypes.LOAD_COMMENTS_REQUEST, runLoadComments );
    yield takeEvery( ActionTypes.SAVE_CODE_REQUEST, runSaveCode );
    yield takeEvery( ActionTypes.SAVE_CODE_PUBLIC_REQUEST, runSaveCodePublic );
    yield takeEvery( ActionTypes.VOTE_UP_REQUEST, runVoteUp );
    yield takeEvery( ActionTypes.VOTE_DOWN_REQUEST, runVoteDown );

}

export default RunGlobalSaga;
