import React, {Component} from 'react';

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
            <div style={styles}>
                <h2>{this.props.title}</h2>
                <input value={this.state.title}
                       onChange={(event) => this.onChange(event, 'title')}
                       type={'text'}
                       placeholder={'Titulo'}/>
                <br/>
                <textarea value={this.state.text}
                          onChange={(event) => this.onChange(event, 'text')}
                          placeholder={'Texto do post'}/>
                <br/>
                <button onClick={()=> {
                    this.setState({title: '', text: ''})
                    this.props.onSubmit(this.state)
                }}>
                    Postar
                </button>
            </div>
        );
    }
}

const styles = {
    padding: 20
}

export default CreatePost;