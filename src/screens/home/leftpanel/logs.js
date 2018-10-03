import React, { Component } from 'react';
import axios from 'axios';

class Logs extends Component {
    constructor() {
        super();

        this.owApi = 'http://34.237.44.133:10001/api/v1';
        this.myAxios = axios.create({
            auth: {
                username: '789c46b1-71f6-4ed5-8c54-816aa4f8c502', 
                password: 'abczO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP'
            }
        });
	}
	
    handleClick () {
        this.myAxios.post(this.owApi+'/namespaces/whisk.system/actions/demo/hello?blocking=true')
            .then((response) => {
                console.log("invoke:",response.data);
                this.props.sendData(response.data);
            });
	}
	
    parseObject (data) {
		let out = Object.keys(data).map(
			(row, i) => { 
				let inner = data[row]; //console.log('now', inner);

				if (typeof inner === 'string') {
					return 	(
								<tr key={i}>
									<td>{row}</td>
									<td>{inner}</td>
								</tr>
							);
       		        //return ( <td>{inner}</td> );
				} 
				 // eslint-disable-next-line
				else if (typeof inner === 'array') {
       		        return  inner.map(
                                (rrow, ii) => 
                                    (<tr key={ii}>
                                        <td>array</td>
                                        <td>{rrow}</td>
                                        <td>{ii}</td>
                                    </tr>)
						    );
				} 
				else if (typeof inner === 'object') {

				}
				return undefined;
			}
		);
  	    return out;
    }

    renderLogs () {
	    if (this.props.lastActivationData.annotations) {
			let data = this.props.lastActivationData;
			let logs = this.props.lastActivationLogs;
			//let out = this.parseObject(data);
			
			return (
				<table>
					<tr><td>Name</td><td>{data.name}</td></tr>
					<tr><td>ActivationId</td><td>{data.activationId}</td></tr>
					<tr><td>Duration</td><td>{data.duration}</td></tr>
					<tr><td>Status</td><td>{data.response['status']}</td></tr>
					<tr><td>Response</td><td>{JSON.stringify(data.response.result)}</td></tr>
					<tr><td>Logs</td><td>{JSON.stringify(logs)}</td></tr>
				</table>
			);
		}
	}

    render() {
        return this.renderLogs();
    }
}

export default Logs;
