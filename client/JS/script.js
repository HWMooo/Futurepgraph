const userName = document.getElementById('userArea');
const title = document.getElementById('titleArea');
const post = document.getElementById('postArea');
const button = document.getElementById('submitButton');
const showpost = document.getElementById('postList');
var coll = document.getElementsByClassName("collapsible")
const wherePostsContained = document.getElementById('postContainer');




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
    setTimeout(function(){window.location.reload();},10);

}

async function showPostsOnLoad(){
    let user = document.cookie.split("=")[1];
    if(user !== ""){
        //console.log(user);
        const response = await fetch('http://localhost:3000/posts/'+user);
        let theUserPosts = await response.json();
        for(posts in theUserPosts){
            let aTitle = document.createElement('button');
            aTitle.classList.add("collapsible");
            let title = document.createTextNode(`${theUserPosts[posts].title}`);
            aTitle.append(title);
            let postContainer = document.createElement('div');
            postContainer.classList.add('content');
            aTitle.insertAdjacentElement('afterend', postContainer);
            let actualPost = document.createElement('p');
            let postContent = document.createTextNode(`${theUserPosts[posts].post}`)
            actualPost.append(postContent);
            postContainer.append(actualPost);
            wherePostsContained.append(aTitle);
            console.log(coll.length)
            
        }

        return theUserPosts;
        
        
        
        
        
        
    }else{


    }
    
    

    
}

showPostsOnLoad().then(() => {
    coll = document.getElementsByClassName("collapsible")
    for (let i = 0; i < coll.length; i++) {
        console.log("coll length here = ", coll.length)
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }

});













