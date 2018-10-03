import React from 'react';

import Header from './header';
import LeftPanel from './leftpanel';
import RightPanel from './rightpanel';

import registerServiceWorker from './registerServiceWorker';

import './styles.scss';
class Home extends React.Component {

  	render() {
    	return (
			<div style={{backgroundColor : 'rgb(233,233,233)'}}>
				<Header />
				
				<div className = 'container-fluid' style = {{ margin : 0 , padding : 0}}>
					<div style = {{ minWidth : 1200}}>
						<LeftPanel />
						<RightPanel />
					</div>
				</div>
			</div>
    	);
  	}
}

export default Home;

registerServiceWorker();
