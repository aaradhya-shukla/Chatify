const ul = document.getElementById('my-list')
const sendbtn = document.getElementById('send');
const token = localStorage.getItem('token');
sendbtn.addEventListener('click',sendMsg);
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        console.log(token)
        const result = await axios.get('http://localhost:3000/user/get-chat',{
            headers:{
                authenticate:token
            }
        });
        console.log(result)
        const users = result.data.users;
        const messages = result.data.messages;
        console.log(users)
        show(users,messages)
    }
    catch(err){
        console.log(err)
    }
})

function show(users,messages){
    if(users){
        console.log(ul)
        for(let i of users){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-user')
            li.textContent=`${i.name} joined..`;
            let br = document.createElement('br');
            li.appendChild(br);
            ul.appendChild(li);
            
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

function addNewMsg(user,message){
    let li = document.createElement('textarea');
    li.setAttribute('class','message-inpt-msg')
    li.textContent=user+':'+message;
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
        addNewMsg(result.data.user,message);
        console.log(result)
        
    }
    catch(err){
        console.log(err.reponse.data.msg);
    }
}