

const ul = document.getElementById('message-area')
const p = document.getElementById('user-area');
const sendbtn = document.getElementById('send');
const token = localStorage.getItem('token');
sendbtn.addEventListener('click',sendMsg);
window.addEventListener('DOMContentLoaded',()=>{
    const message_arr = JSON.parse(localStorage.getItem('messages'))
    if (message_arr===null){
        getAllmessages()
    }
    else{
        getOnlineUsers().then((users)=>{
            show(users,message_arr)
        }).catch((err)=>console.log(err));
        
    }
})
async function getAllmessages(){
    try{
        console.log(token)
        const result = await axios.get('http://localhost:3000/user/get-chat',{
            headers:{
                authenticate:token
            }
        });
        console.log(result)
        const users = result.data.users;
        let messages = result.data.messages;
        console.log(users)
        // if(messages.length>10){
        //     messages.splice(0,10);
        // }
        localStorage.setItem('messages',JSON.stringify(messages));
        localStorage.setItem('users',JSON.stringify(users));
        show(users,messages)
    }
    catch(err){
        console.log(err)
    }
}
function show(users,messages){
    if(users){
        console.log(ul)
        for(let i of users){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-user')
            li.set
            li.textContent=`${i.name} joined..`;
            let br = document.createElement('br');
            li.appendChild(br);
            p.appendChild(li);
            
        }
    }
    
    if(messages){
        console.log("hee",messages)
        for(let i of messages){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-msg')
            li.textContent=i.name+':'+i.message;
            let br = document.createElement('br');
            li.appendChild(br);
            ul.appendChild(li)
        }
    }
}

function addNewMsg_local(message){
    const message_arr = JSON.parse(localStorage.getItem('messages'))
    if(message_arr.length>10){
        message_arr.splice(0,10);
    }
    message_arr.push(message);
    localStorage.setItem('messages',JSON.stringify(message_arr));
    let li = document.createElement('textarea');
    li.setAttribute('class','message-inpt-msg')
    li.textContent=message.name+':'+message.message;
    let br = document.createElement('br');
    li.appendChild(br);
    ul.appendChild(li)
}

async function sendMsg(e){
    
    e.preventDefault();
    try{
        let message = document.getElementById('message').value;
        const result = await axios.post('http://localhost:3000/user/send-msg',{message:message},{
            headers:{
                authenticate:token
            }
        })
        addNewMsg_local(result.data.message);
        console.log(result)
        
    }
    catch(err){
        console.log(err.reponse.data.msg);
    }
}

setInterval(async()=>{
    const message_arr = JSON.parse(localStorage.getItem('messages'))
    let id = message_arr[message_arr.length-1].id
    console.log("message_arr",id)
    try{
        const result = await axios.get(`http://localhost:3000/user/get-new-msg?messageId=${id}`)
        console.log(result);
        const new_messages = result.data.messages;
        if(new_messages){
            console.log(new_messages)
            addNewMsg_db(new_messages);
        }
        // getOnlineUsers().then((users)=>{
        //     show(users,[]);
        // })
    }
    catch(err){
        console.log(err);
    }
},5000)

function addNewMsg_db(messages){
    let message_arr = JSON.parse(localStorage.getItem('messages'))
    if(message_arr.length>10){
        message_arr.splice(0,10);
    }
    message_arr=[...message_arr,...messages];
    localStorage.setItem('messages',JSON.stringify(message_arr));
    for(let i of messages){
        let li = document.createElement('textarea');
        li.setAttribute('class','message-inpt-msg')
        li.textContent=i.name+':'+i.message;
        let br = document.createElement('br');
        li.appendChild(br);
        ul.appendChild(li)
    }
}

async function getOnlineUsers(){
    try{
        if(localStorage.getItem('users')===null || localStorage.getItem('users')=== 'undefined'){

        }
        const result = await axios.get('http://localhost:3000/user/get-users')
        const users = result.data.users;
        return users;
    }
    catch(err){
        console.log(err);
    }
}

setInterval(async()=>{
    getOnlineUsers().then((users)=>{
        const local_users = localStorage.getItem('users');
        if(JSON.stringify(users)!=local_users){
            const children = p.children;
            let main=document.getElementById('area')
            for(let i of children){
                p.removeChild(i)
            }
            localStorage.setItem('users',JSON.stringify(users));
            show(users,[]);
        }
        
    })
},10000)