import React, {Component} from 'react';
import {Button,
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Input,
    Grid
} from '@material-ui/core';

class CreatePost extends Component {
    constructor(){
        super();
        this.state={
            title: '',
            text: ''
        }
    }

    onChange(event, key){
        const value = event.target.value;
        this.setState({[key]: value})
    }


    render(){
        console.log(this.state);
        return(
            <Card style={styles}>
                <h2>{this.props.title}</h2>
                <Input  fullWidth
                    value={this.state.title}
                       onChange={(event) => this.onChange(event, 'title')}
                       type={'text'}
                       placeholder={'Titulo'}/>
                <br/>
                <Input multiline
                       fullWidth
                    value={this.state.text}
                          onChange={(event) => this.onChange(event, 'text')}
                          placeholder={'Texto do post'}/>
                <br/>
                <Button onClick={()=> {
                    this.setState({title: '', text: ''})
                    this.props.onSubmit(this.state)
                }}>
                    Postar
                </Button>
            </Card>
        );
    }
}

const styles = {
    padding: 20
}

export default CreatePost;