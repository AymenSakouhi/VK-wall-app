import React from 'react';
import ReactDOM from 'react-dom';
import './posts.css';
import Posts from './components/PostComponent/Posts';
let token ="null";
let url = window.location.href;
let split = url.split('=');
if(split.length===1){
    //подключитесь к vk api и получите токен доступа
    ReactDOM.render(<a
        href="https://oauth.vk.com/authorize?client_id=6697562&display=page&redirect_uri=http://localhost:3000/&scope=wall&response_type=token&v=5.85"
        className="btn btn-primary">Подключение к vk</a>, document.getElementById('root'));
}
else{
    //Показать статьи
    let split2 = split[1].split('&');
    token = split2[0];
    ReactDOM.render(<Posts token={token}/>,document.getElementById('root'));
}