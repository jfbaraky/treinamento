import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import PostView from './components/postView';
import NotFoundView from './components/notFoundView';
import PostDetails from "./components/postDetails";
import moment from 'moment';

class App extends Component {
  render(){
      const userIsLogged = true;
        if(userIsLogged){
            return(
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/post/:id' component={PostDetails}/>
                        <Route exact path='/' component={PostView}/>
                        <Route path='*' component={NotFoundView} />
                        }/>
                    </Switch>
                </BrowserRouter>
            );
        } else {
            return(
                <BrowserRouter>
                    <Switch>
                        <Route  path='*' component={() => <div> Faça o login</div>}/>
                        }/>
                    </Switch>
                </BrowserRouter>
            );
        }

  }
}

export default App;