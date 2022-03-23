const { Cookie } = require("cookiejar");

const userName = document.getElementById('userArea');
const title = document.getElementById('titleArea');
const post = document.getElementById('postArea');
const button = document.getElementById('submitButton');
const showpost = document.getElementById('postList');



button.addEventListener('click', addPosttoDbAndShow);


async function addPosttoDbAndShow (){
    let user = document.cookie = `username = ${userName.value}`;
    fetch('', {
        method: 'POST',
        body: JSON.stringify({
            name: userName.value,
            title: title.value,
            post: post.value
        }),
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(() => {
        fetch('').then(function (response) {
            response.json().then(function (json) {
                for (item in json){
                    let aPost = document.createElement('li');
                    let text = document.createTextNode(``);
                    aPost.append(text);
                    showpost.appendChild(aPost);

                }
            })
        })
    })

}

async function showPostsOnLoad(){
    let user = document.cookie;
    if(user){
        
    }
    

    
}







