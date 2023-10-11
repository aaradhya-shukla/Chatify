const ul = document.getElementsByClassName('my-list')


window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:3000/user/get-chat',{
            headers:{
                authenticate:token
            }
        });
        const users = result.data.users;
        const messgaes = result.data.messgaes;
    }
    catch(err){
        console.log(err)
    }
})

function show(users,messgaes){
    if(users){
        for(let i of users){
            let li = document.createElement('li');
            li.textContent=`${i} joined..`;
            ul.appendchild(li)
        }
    }
    
    if(messages){
        for(let i of messages){
            let li = document.createElement('li');
            li.textContent=i.user+':'+i.text;
            ul.appendchild(li)
        }
    }
}