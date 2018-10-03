import axios from 'axios';
const ApiUrl = 'http://34.237.44.133:10001/api/v1';
var myAxios;
var TOKEN;
//var namespace;
//var KEY;
//const myAxios = axios.create({
    //auth: {
        //username: '',
        //password: ''
    //}});

function setKey () {
  try {
    TOKEN = localStorage.getItem('user_token');
    //KEY = localStorage.getItem('KEY').split(':');
    //namespace = KEY[2];
    //console.log("API KEY", KEY);
    // Don't actually need basic auth if we're using web actions for everything
    //myAxios = axios.create({
    //    auth: {
    //        username: KEY[0],
    //        password: KEY[1]
    //    }});
    myAxios = axios.create();
    return
  } catch(e) {
    console.log("KEY NOT FOUND IN LOCAL STORAGE");
    return
  }
}
setKey();

function loadCode ( action ) {
    var data = {
      action: action,
      token: TOKEN
    };
    console.log("ACTION", data);
    //console.log( ApiUrl + '/namespaces/whisk.system/actions/' + action +'?blocking=true' );
    //return myAxios.get( ApiUrl + '/namespaces/whisk.system/actions/' + action +'?blocking=true')
    //return myAxios.get( ApiUrl + '/namespaces/whisk.system/actions/private/' + action +'?blocking=true')
    return myAxios.post( ApiUrl + '/web/slipstream/private/ow_load_code', data)
            .then((response) => {
                //console.log(response.data);
                return response.data;
            });
}

function getEsQuery( search ) {
    //console.log( search );
    var data = {
        search : search === undefined ? 'elasticsearch' : search,
        token : TOKEN
    }
    return myAxios.post( ApiUrl + '/web/slipstream/private/es_query?blocking=true', data )
            .then((response) => {
                return response.data.hits
            });
};

// weird duplicity with getRatings()
/*function loadingComment( id ) {
    var data = {
        parentId: id,
        token: TOKEN
       }
    return myAxios.post( ApiUrl + '/web/slipstream/private/es_get_ratings?blocking=true', data )
            .then((response) => {
                //let comments = response.data.response.result.hits;
                let comments = response.data.hits;
                return comments;
            });
}*/

function loadComponent( state ) {
  //setKey();
  state['token'] = TOKEN;
  console.log('STATE:', state);
    //return myAxios.get( ApiUrl + '/namespaces/' + state.ns + '/packages/' + state.group + '?blocking=true')
    return myAxios.post( ApiUrl + '/web/slipstream/private/ow_load_components?blocking=true', state)
            .then((response) => {
                console.log("COMPS", response);
                let data = response.data;
                return data;
            });
}

function postReply( send ) {
  //return myAxios.post( ApiUrl + '/namespaces/whisk.system/actions/submit_es?blocking=true', JSON.stringify(send) )
  console.log("SENDING:", send);
  var data = {
    send: send,
    token: TOKEN
  };
  //return myAxios.post( ApiUrl + '/namespaces/whisk.system/actions/submit_es?blocking=true', send )
  return myAxios.post( ApiUrl + '/web/slipstream/private/submit_es', data )
            .then((response) => {
                console.log(response);
                return response.data;
                //this.setState({lastActivationData: response.data});
            });
}

function postQuestion( send ) {
  //return myAxios.post( ApiUrl + '/namespaces/whisk.system/actions/submit_es?blocking=true', JSON.stringify(send) )
  console.log("SENDING:", send);
  var data = {
    send: send,
    token: TOKEN
  };
  //return myAxios.post( ApiUrl + '/namespaces/whisk.system/actions/submit_es_ask?blocking=true', send )
  return myAxios.post( ApiUrl + '/web/slipstream/private/submit_es_ask', data )
            .then((response) => {
                console.log(response);
                return response.data;
                //this.setState({lastActivationData: response.data});
            });
}

function runCode( action ) {
  var data = {
    action: action.state,
    token: TOKEN
  };
  console.log("RUNNING:", data);
  //return myAxios.post( ApiUrl + '/namespaces/whisk.system/actions/private/' + action.state +'?blocking=true')
  //return myAxios.post( ApiUrl + '/web/slipstream/private/ow_run_code', data)
  return myAxios.post( ApiUrl + '/web/slipstream/private/ow_run_code', data)
            .then((response) => {
                console.log(response);
                return response.data;
            });
}

function getRatings ( action ) {
  //return myAxios.post(ApiUrl + '/namespaces/whisk.system/actions/es_get_ratings?blocking=true', { parentId: action.state })
  var data = {
    parentId: action.state,
    token: TOKEN
   };
  return myAxios.post(ApiUrl + '/web/slipstream/private/es_get_ratings?blocking=true', data)
  .then((response) => {
      //return response.data.response.result.hits;
      return response.data.hits;
      //console.log("COMMENTS:", response.data);
      //let comments = response.data.hits;
      //return comments;
    });
}

function saveCode ( send ) {
  console.log("SAVE API", send.state);
  var data = {
    send: send.state,
    token: TOKEN
  };
  //return myAxios.post(ApiUrl + '/namespaces/whisk.system/actions/save_ow?blocking=true', send.state)
  return myAxios.post(ApiUrl + '/web/slipstream/private/save_ow', data)
  .then((response) => {
      //return response.data.response.result;
      return response.data;
    });
}

function saveCodePublic ( send ) {
  console.log("SAVE PUBLIC API", send.state);
  var data = {
    send: send.state,
    token: TOKEN
  };
  //return myAxios.post(ApiUrl + '/namespaces/whisk.system/actions/save_ow_public?blocking=true', send.state)
  return myAxios.post(ApiUrl + '/web/slipstream/private/save_ow_public', data)
  .then((response) => {
      //return response.data.response.result;
      return response.data;
    });
}

function voteUp ( action ) {
  console.log("VOTE API", action);
  //Question
  //myAxios.post( this.owApi+'/namespaces/whisk.system/actions/update_es_post_up?blocking=true', JSON.stringify(send) )
  //Answer
  //myAxios.post( this.owApi+'/namespaces/whisk.system/actions/update_es_rating_up?blocking=true', JSON.stringify(send) )

}

function voteDown ( action ) {
  console.log("VOTE API", action);

}

export { getEsQuery, loadCode, loadComponent, postReply, postQuestion, setKey, runCode, getRatings, saveCode, saveCodePublic, voteUp, voteDown };
