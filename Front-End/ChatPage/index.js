const group_area = document.getElementById('Group-area')
const create_group = document.getElementById('add-group');
const message_area = document.getElementById('message-area')
const user_area = document.getElementById('user-area');
const sendbtn = document.getElementById('send');
const token = localStorage.getItem('token');
const exitbtn = document.getElementById('exit');
const globalbtn = document.getElementById('global');
const admin = document.getElementById('admin');
//Adding event listeners
create_group.addEventListener('click',createGroup);
admin.addEventListener('click',AdminView);
sendbtn.addEventListener('click',sendMessage);
exitbtn.addEventListener('click',logout);
globalbtn.addEventListener('click',globalChat);
window.addEventListener('DOMContentLoaded',async (e)=>{
    await getAllMessages();
    await getAllGroups();
    await getAllUsers();
})

// MESSAGE

// this is only for dom reload and when a new group is selected
async function getAllMessages(){
    // get all global messages with groupId null
    // or get all messages of a group
    // first check group args if null means global else not
    // store all the messages in local storage
    // after storing messgaes into local storage share to showAllmessages
    let group_name = localStorage.getItem('current_group');
    if(group_name===null){
        group_name="";
    }
    console.log('gr',group_name);
    try{
        console.log('inside')
        const result = await axios.get(`http://54.210.91.135:3000/user/get-chat?group=${group_name}`,{
            headers:{
                authenticate:token
            }
        });
        const messages = result.data.messages;
        console.log('in windows dom',messages)
        localStorage.setItem('messages',JSON.stringify(messages));
        showAllMessages();
    }
    catch(err){
        console.log(err)
    }
}

//get new messages check them periodically 

async function getNewMessages(){
    // get messages from local storage
    // check if current_group exists if yes then we get group messages from last id of messages 
    // get those messages and check if local storage messages >10 
    // if yes then remove the first 10
    // and add the new messages to the list and store again in local storage
    let messages = JSON.parse(localStorage.getItem('messages'));
    let group_name = localStorage.getItem('current_group');
    if(group_name===null){
        group_name="";
    }
    let messageId = 0;
    if(messages.length>0){
        messageId = messages[messages.length-1].id
        if(messages.length>10){
            messages.splice(0,10); 
        }
    }
    try{
        const result = await axios.get(`http://54.210.91.135:3000/user/get-new-msg?messageId=${messageId}&group=${group_name}`)
        const new_messages = result.data.messages;
        messages = [...messages,...new_messages];
        console.log("new messages-result",result)
        localStorage.setItem('messages',JSON.stringify(messages)); 
        showNewMessag(new_messages);
    }
    catch(err){
        console.log(err);
    }
}

//send a message

async function sendMessage(e){
    // get group name from local storage if it exists
    // add this message to loca storage
    // display this message on screen
    // send a post request to backend 
    e.preventDefault();
    const message_to_send = document.getElementById('message').value;
    let group_name = localStorage.getItem('current_group');
    if(group_name===null){
        group_name="";
    }
    let messages = JSON.parse(localStorage.getItem('messages'));
    try{
        const result = await axios.post(`http://54.210.91.135:3000/user/send-msg?group=${group_name}`,{message:message_to_send},{
            headers:{
                authenticate:token
            }
        })
        console.log('from sendmessage',result)
        messages.push(result.data.message);
        localStorage.setItem('messages',JSON.stringify(messages));
        showNewMessag([result.data.message]);
    }
    catch(err){
        console.log(err);
    }
    

}

// Group

//get all groups of a respective user check periodically
async function getAllGroups(){
    // take token add to headers
    // request backend for all groups
    // add all groups to local storage
    // call showAllGroups
    try{
        const result = await axios.get('http://54.210.91.135:3000/group/get-groups',{
            headers:{
                authenticate:token
            }
        })
        const groups = result.data.groups;
        localStorage.setItem('groups',JSON.stringify(groups));
        showAllGroups(groups);
    }
    catch(err){
        console.log(err);
    }
}

//to create a new group
function createGroup(e){
    //take group name and numbers of user seprated with space
    //put the numbers in form of an array and send it to backend along with group name
    //call showNewGroup passing the new groups
    e.preventDefault();
    window.location.replace('../Group/Groupe.html');
}

//to get any new group created by the user check periodically
async function getNewGroups(){
    //call backend in set interval to check for any new groups
    //get groups from local storage and compare new groups
    //call showNewGroup
    try{
        const result = await axios.get('http://54.210.91.135:3000/group/get-new-groups',{
            headers:{
                authenticate:token
            }
        })
        const new_groups = result.data.groups;
        let groups = JSON.parse(localStorage.getItem('groups'));
        if(groups.length!=new_groups.length){
            localStorage.setItem('groups',JSON.stringify(new_groups));
            showNewGroup(new_groups);
        }
        
    }
    catch(err){
        console.log(err);
    }

}

//function after selecting a new group
async function selectGroup(e){
    //get all messages of the group and store in local storage
    //get all users of the group and store in local storage
    //set current group name in local storage
    //pass group name to getAllMessages
    const group_name = e.target.textContent;
    localStorage.setItem('current_group',group_name);
    const result = await axios.get(`http://54.210.91.135:3000/group/check-for-admin?group=${group_name}`,{
        headers:{
            authenticate:token
        }
    });
    await getAllMessages();
    await getAllGroups();
    await getAllUsers();
    console.log("hello")
    console.log("group select",result)
    if (result.data.admin){
        console.log("group select",result)
        admin.disabled = false;
    }
    else{
        admin.disabled = true;
    }


}


//Users

// this function get all users

async function getAllUsers(){
    // get current group name
    // if group then get all associated users else get all online users
    let group_name = localStorage.getItem('current_group');
    if(group_name===null){
        group_name="";
    }
    try{
        const result = await axios.get(`http://54.210.91.135:3000/user/get-users?group=${group_name}`,{
            headers:{
                authenticate:token
            }
        })
        const users = result.data.users;
        localStorage.setItem('users',JSON.stringify(users));
        showAllUsers(users);
    }
    catch(err){
        console.log(err);
    }
}

// get any new user

async function getNewUser(){
    let users = JSON.parse(localStorage.getItem('users'));
    let group_name = localStorage.getItem('current_group');
    if(group_name===null){
        group_name="";
    }
    let userId = 0;
    if(users.length>0){
        userId = users[users.length-1].id;
    }
    try{
        console.log(group_name)
        const result = await axios.get(`http://54.210.91.135:3000/user/get-new-users?group=${group_name}&userId=${userId}`,{
            headers:{
                authenticate:token
            }
        })
        const new_users = result.data.users;
        console.log(">>>>>users",users,new_users)
        if(users.length!=new_users.length){
            localStorage.setItem('users',JSON.stringify(new_users));
            showNewUsers(new_users);
        }
        
    
    }
    catch(err){
        console.log(err);
    }
}

//show all messages
function showAllMessages(){
    //add elements to the message area
    // 
    const messages = JSON.parse(localStorage.getItem('messages'));
    while(message_area.lastElementChild){
        message_area.removeChild(message_area.lastElementChild);
    }
    if(messages){
        for(let i of messages){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-msg')
            li.textContent=i.name+':'+i.message;
            let br = document.createElement('br');
            li.appendChild(br);
            message_area.appendChild(li)
        }
    }
} 

//to show new messages
function showNewMessag(messages){
    if(messages){
        for(let i of messages){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-msg')
            li.textContent=i.name+':'+i.message;
            let br = document.createElement('br');
            li.appendChild(br);
            message_area.appendChild(li)
        }
    }
}

//to show all users

function showAllUsers(){
    const users = JSON.parse(localStorage.getItem('users'));
    while(user_area.lastElementChild){
        user_area.removeChild(user_area.lastElementChild);
    }
    if (users){
        for(let i of users){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-user')
            li.textContent=`${i.name} joined..`;
            let br = document.createElement('br');
            li.appendChild(br);
            user_area.appendChild(li);
            
        }
    }
}

//check if new users online

function showNewUsers(users){
    if (users){
        while(user_area.lastElementChild){
            user_area.removeChild(user_area.lastElementChild);
        }
        for(let i of users){
            let li = document.createElement('textarea');
            li.setAttribute('class','message-inpt-user')
            li.textContent=`${i.name} joined..`;
            let br = document.createElement('br');
            li.appendChild(br);
            user_area.appendChild(li);
            
        }
    }
}

// to show all groups

function showAllGroups(){
    const groups = JSON.parse(localStorage.getItem('groups'));
    while(group_area.lastElementChild){
        group_area.removeChild(group_area.lastElementChild);
    }
    if (groups){
        for(i of groups){
            let btn = document.createElement('button');
            btn.textContent = i.name;
            btn.setAttribute('id',`${i.name}`)
            btn.addEventListener('click',selectGroup);
            group_area.appendChild(btn)
        }
    }
}

// check for new groups

function showNewGroup(groups){
    if (groups){
        while(group_area.lastElementChild){
            group_area.removeChild(group_area.lastElementChild);
            console.log('yes i am deleteing')
        }
        for(i of groups){
            let btn = document.createElement('button');
            btn.textContent = i.name;
            btn.setAttribute('id',`${i.name}`)
            btn.addEventListener('click',selectGroup);
            group_area.appendChild(btn)
        }
    }
}

//logout

async function logout(e){
    e.preventDefault();
    try{
        localStorage.setItem('users','');
        localStorage.setItem('groups','');
        localStorage.setItem('current_group','');
        const result = await axios.get('http://54.210.91.135:3000/user/log-off',{
            headers:{
                authenticate:token
            }
        })
        window.location.replace('../Login/Login.html')
    }
    catch{
        console.log(err)
    }
}


function globalChat(e){
    e.preventDefault();
    localStorage.setItem('users','');
    localStorage.setItem('groups','');
    localStorage.setItem('current_group','');
    window.location.reload();

}

function AdminView(e){
    e.preventDefault();
    window.location.replace('../AdminPage/AdminPage.html');
}

setInterval(async ()=>{
    await getNewGroups();
   await getNewUser();
    await getNewMessages();
},1000)