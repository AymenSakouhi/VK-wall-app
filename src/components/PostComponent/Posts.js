import React, { Component } from 'react';
import Post from './Post';
import './Post.css';
import $ from 'jquery'
class Posts extends Component {
    constructor (props){
        super(props);
        this.state = {
            items:[],
            groups:[],
            page:1,
        };
        this.nextClick = this.nextClick.bind(this);
        this.backClick = this.backClick.bind(this);
        //this.handleScroll = this.handleScroll.bind(this);
    }
    //делать сообщения
    postsRender(page){
        let offset = page*4;
        if(page===1){
            offset=0;
        }
        //получать данные от vk
        let url = 'https://api.vk.com/method/wall.get?domain=extrawebdev&offset='+offset+'&access_token='+this.props.token+'&count=4&extended=1&v=5.85';
        $.ajax({
            url:url,
            method:'GET',
            dataType:'JSONP',
            success:(data)=>{
                var posts =data.response;
                this.setState({items:posts.items});
                this.setState({groups:posts.groups});
            }
        });
    }
    nextClick(){
        this.state.page++;
        this.postsRender(this.state.page);
    }
    backClick(){
        if(this.state.page<=1){
            alert('вы находитесь на первой странице');
        }
        else{
            this.state.page--;
            this.postsRender(this.state.page);
        }

    }
    componentDidMount() {
        this.postsRender(this.state.page);
    }
    render(){
        let text;
        let photo ='https://www.rosegoldstudio.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg';
        return(
            <div>
                <div >
                    {
                        //цикл над состоянием элементов для отображения всех сообщений
                        this.state.items.map((item) => {
                            //обрабатывать текст, если нет текста из vk
                            if (item.copy_history == undefined) {
                                text = 'извините, у этого сообщения нет текста, нет данных, поступающих из api vk';
                            }
                            else {
                              text = item.copy_history[item.copy_history.length-1].text;
                                //справиться с проблемой фото, если нет фотографий
                                if(item.copy_history[item.copy_history.length-1].attachments[0].photo==undefined){
                                    photo ='https://www.rosegoldstudio.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg';
                                }
                                else{
                                    photo=item.copy_history[item.copy_history.length-1].attachments[0].photo.sizes[item.copy_history[item.copy_history.length-1].attachments[0].photo.sizes.length-1].url;
                                }
                            }

                            return <Post key={item.id} content={text} photo={photo}/>
                        })
                    }

                </div>
                <div className="bar">
                    <a href="#" onClick={this.backClick} className="back btn btn-primary">назад</a>
                    <a href="#" onClick={this.nextClick} className="next btn btn-primary">следующий</a>
                </div>
            </div>
        );
    }
}

export default Posts;

