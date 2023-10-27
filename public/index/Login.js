const form = document.getElementById('my-form');
const singup = document.getElementById('signup');

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginObj={
        email:email,
        password:password
    }
    try{
        const result = await axios.post('http://localhost:3000/user/Login',loginObj)
        console.log(result.data.token)
        localStorage.setItem('token',result.data.token);
        alert(result.data.msg);
        window.location.replace('./chatPagealt.html');
        
    }
    catch(err){
        console.log(err)
        if(err.response.data.msg==='user does not exists'){
            alert('user does not exist')
        }
        else if(err.response.data.msg==="User not authorized"){
            alert("User not authorized")
        }
    }
})

singup.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.replace('./SignUp.html')
})