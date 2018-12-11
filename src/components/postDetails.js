import React, {Component} from 'react';
import Post from "./post";
import axios from 'axios';

class PostDetails extends Component {
    constructor() {
        super();
        this.state={
            post: null,
            error: null
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/posts/' + this.props.match.params.id).then(response => {
            this.setState({post: response.data});
        }).catch(error => {
            this.setState({error: error});
        })
    }

    onDeletePost(){
        this.props.history.push('/');
    }

    render(){
        if(!this.state.post){
            return <div>
                Loading
                {this.state.error ?
                    <p>
                        {this.state.error.message}
                    </p>
                    : null
                }
            </div>;
        }
        return (
            <div>
                <Post
                        id={this.state.post.id}
                      title={this.state.post.title}
                        onDelete={()=>this.onDeletePost()}
                      navigate={(route)=>this.props.history.push(route)}
                      time={this.state.post.time}>
                    {this.state.post.text}
                </Post>
                {this.state.error ?
                    <p>
                        OCORREU UM ERRO
                    </p>
                    : null
                }
            </div>
        )
    }
}

export default PostDetails;