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
        alert(result.data.msg);
    }
    catch(err){
        console.log(err)
        if(err.response.data.msg==='user does not exists'){
            alert('user does not exist')
        }
    }
})

singup.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.replace('../SignUp/SignUp.html')
})