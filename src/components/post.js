import React, {Component} from  'react';
import Comment from './comment';
import './post.css';

class Post extends Component{
    constructor(){
        super();
        this.state={
            likes: 0,
            newComment: '',
            comments: []
        }
    }

    onChange(event, key){
        const value = event.target.value;
        this.setState({[key]: value})
    }

    componentDidMount(){
        this.readFromStorage();
    }

    onSubmitComment(){
        const newComment = this.state.newComment;
        const comments = this.state.comments;

        comments.push({text: newComment, post: this.props.time});
        this.saveInStorage();
        this.setState({
            comments,
            newComment: ''
        })
    }

    saveInStorage(){
        const commentArray = this.state.comments;
        localStorage.setItem('comment_' + this.props.time, JSON.stringify(commentArray));
    }

    readFromStorage(){
        let commentsSaved = localStorage.getItem('comment_' + this.props.time);
        commentsSaved = JSON.parse(commentsSaved);

        this.setState({comments: commentsSaved  || []});
    }

    render(){
        console.log('POST RENDER')
        return(
            <div className='post'>
                <h2 style={componetStyles.title}>
                    {this.props.title}
                </h2>
                <p>{this.state.likes}</p>
                <small>{this.props.time.toString()}</small>
                <p>{this.props.children}</p>
                <button
                    onClick={()=>this.setState({likes:this.state.likes+1})}>
                    Like
                </button>
                {this.state.comments.map(comment => {
                    return <Comment text={comment.text}/>
                })}
                <br/>
                <input
                    value={this.state.newComment}
                    onChange={(event)=>this.onChange(event,'newComment')}
                    placeholder={'Novo comentário'}/>
                <button onClick={()=>this.onSubmitComment()}>
                    Postar comentário
                </button>
            </div>
        );
    }
}

const componetStyles={
    title: {
        color: 'red'
    }
}

export default Post;