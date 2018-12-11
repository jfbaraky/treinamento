import React, {Component} from  'react';
import {Button,
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Grid
} from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import Comment from './comment';
import './post.css';
import axios from 'axios';
import moment from 'moment';

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            likes: props.actualLikes,
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

    onLike(){
        const likeCount = this.state.likes;
        const newPost = {
            likes: likeCount + 1,
            title: this.props.title,
            text: this.props.children,
            time: this.props.time
        };
        axios.put('http://localhost:3000/posts/' + this.props.id, newPost).then(()=> {
            this.setState({likes: likeCount + 1});
        })
    }

    deletePost(){
        axios.delete('http://localhost:3000/posts/' + this.props.id).then(()=> {
            this.props.onDelete(this.props.id);
        })
    }

    render(){
        return(
            <Card className='post'>
                <CardContent>
                    <Typography variant="h5" component="h2"
                    onClick={()=>this.props.navigate('/post/' + this.props.id)}
                    >
                    {this.props.title}
                    </Typography>

                <small>{moment(this.props.time).fromNow()}</small>
                <Typography variant="h5" component="h3" color="textSecondary">
                    {this.props.children}
                </Typography>
                    <p>{this.state.likes}</p>
                    <IconButton onClick={()=>this.onLike()} color="primary"  component="span">
                        <ThumbUp />
                    </IconButton>

                {this.state.comments.map(comment => {
                    return <Comment text={comment.text}/>
                })}
                <br/>
                    <Grid container spacing={24}>
                        <Grid item xs={8}>
                            <Input
                                fullWidth
                                value={this.state.newComment}
                                onChange={(event)=>this.onChange(event,'newComment')}
                                placeholder={'Novo comentário'}/>
                        </Grid>
                            <Grid item xs={4}>
                                <CardActions>
                                    <Button style={{backgroundColor: '#4d9048'}} onClick={()=>this.onSubmitComment()} variant="contained" color="primary">
                                        Postar comentário
                                    </Button>
                                    <IconButton aria-label="Delete" onClick={this.deletePost.bind(this)}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                </CardActions>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const componetStyles={
    title: {
        color: 'red'
    }
}

export default Post;