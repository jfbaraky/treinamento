import React, {Component} from 'react';
import Post from './components/post';
import CreatePost from './components/createPost';

const postArray = [
    // {
    //     title: 'Titulo do post 1',
    //     time: '12:29',
    //     text: 'Esse é o texto do primeiro post'
    // },
    // {
    //     title: 'Titulo do post 2',
    //     time: '12:29',
    //     text: 'Esse é o texto do segundo post'
    // },
    // {
    //     title: 'Titulo do post 3',
    //     time: '12:29',
    //     text: 'Esse é o texto do terceiro post'
    // }
];

class App extends Component {
    constructor(){
        super();
        this.state={
            postArray: []
        }
    }

    componentWillMount(){
        console.log('COMPONENT WILL MOUNT');
    }
    componentDidMount(){
        console.log('COMPONENT DID MOUNT');
        const newState = {
            postArray: postArray
        };
        this.setState(newState);
        this.readFromStorage(); // Load from storage
    }

    saveInStorage(){
        const postArray = this.state.postArray;
        localStorage.setItem('posts', JSON.stringify(postArray));
    }

    readFromStorage(){
        let postSaved = localStorage.getItem('posts');
        postSaved = JSON.parse(postSaved);

        this.setState({postArray: postSaved  || []});
    }

    onSubmitPost(postObject){
        let postArray = this.state.postArray;

        // Adicionando um tempo no post
        postObject.time = new Date().getTime();
        postArray.push(postObject);

        this.setState({postArray: postArray});
        this.saveInStorage();  // Save to storage
    }

  render(){
      const postArray = this.state.postArray.sort((a,b) => b.time - a.time);

      return(
      <div>
          <CreatePost title={"Postar algo novo"} onSubmit={this.onSubmitPost.bind(this)}/>
          {
              postArray.map((post, index) => {
                return(
                    <Post key={index}
                        title={post.title}
                          time={post.time}>
                        {post.text}
                    </Post>
                )
              })
          }
      </div>
    );
  }
}

export default App;