const userName = document.getElementById('userArea');
const title = document.getElementById('titleArea');
const post = document.getElementById('postArea');
const button = document.getElementById('submitButton');
const showpost = document.getElementById('postList');



button.addEventListener('click', addPosttoDb);


async function addPosttoDb (){
    document.cookie = `username=${userName.value}`;
    fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
            title: userName.value,
            name: title.value,
            post: post.value
        }),
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

}

async function showPostsOnLoad(){
    let user = document.cookie.split("=")[1];
    if(user !== ""){
        //console.log(user);
        const response = await fetch('http://localhost:3000/posts/'+user);
        let theUserPosts = await response.json();
        for(posts in theUserPosts){
            let aPost = document.createElement('li');
            let text = document.createTextNode(`${theUserPosts[posts].id}, ${theUserPosts[posts].title}, ${theUserPosts[posts].post}`);
            aPost.append(text);
            showpost.appendChild(aPost);
        }
        

    }else{
        let aPost = document.createElement('li');
        let text = document.createTextNode('No user with that name');
        aPost.append(text);
        showpost.appendChild(aPost);


    }
    

    
}

showPostsOnLoad();







