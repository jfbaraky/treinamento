import React, {Component} from 'react';

class Comment extends Component {
    render(){
        return(
            <div style={{padding: 20}}>
                <p>
                    {this.props.text}
                </p>
            </div>
        );
    }
}

export default Comment;