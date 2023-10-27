

const form = document.getElementById('my-form');
const login = document.getElementById('login');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    const userObj={
        name:name,
        email:email,
        phone:phone,
        password:password
    }
    try{
        const result = await axios.post('http://localhost:3000/user/SignUP',userObj);
        console.log(result);
        alert(result.data.msg);
        window.location.replace('./Login.html')
    }
    catch(err){
        console.log("error>>>",err)
        if(err.response.data.msg==='user already exists'){
            alert('user already exists');
        }
    }
})

login.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.replace('./Login.html');
})