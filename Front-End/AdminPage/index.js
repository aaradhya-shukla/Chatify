let admin = document.getElementById('admin-details');
let newUser = document.getElementById('add-user');
let removeUser = document.getElementById('delete-user');
let newAdmin = document.getElementById('change-admin');
const group_name = localStorage.getItem('current_group');
const token = localStorage.getItem('token');

// adding event listeners

newUser.addEventListener('click',async (e)=>{
    e.preventDefault();
    const phone = document.getElementById('new-user').value;
    try{
        const result = await axios.get(`http://54.210.91.135/group/get-add-newUser?phone=${phone}&group=${group_name}`,{
            headers:{
                authenticate:token
            }
        });
        alert(result.data.msg);
        // history.back();
    }
    catch(err){
        console.log(err);
    }
})

removeUser.addEventListener('click',async (e)=>{
    e.preventDefault();
    const phone = document.getElementById('remove-user').value;
    try{
        const result = await axios.get(`http://54.210.91.135/group/get-delete-User?phone=${phone}&group=${group_name}`,{
            headers:{
                authenticate:token
            }
        });
        alert(result.data.msg);
        history.back();
    }
    catch(err){
        console.log(err);
    }
})

newAdmin.addEventListener('click',async (e)=>{
    e.preventDefault();
    const phone = document.getElementById('update-admin').value;
    try{
        const result = await axios.get(`http://54.210.91.135/group/get-change-admin?phone=${phone}&group=${group_name}`,{
            headers:{
                authenticate:token
            }
        });
        alert(result.data.msg);
        history.back();
    }
    catch(err){
        console.log(err);
    }
})