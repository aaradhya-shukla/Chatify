const numbers = document.getElementById('numbers');
const form = document.getElementById('form-create');
const token = localStorage.getItem('token');

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const group = document.getElementById('name').value;
    let numbers_arr =numbers.value.split(" ");
    // const obj=numbers_arr.map((i)=>{
    //     return {phone:i};
    //    })
    try{
        const result = await axios.post('http://localhost:3000/group/get-create',{
            numbers:numbers_arr,
            name:group
        },
        {
            headers:{
                authenticate:token
            }
        });
        console.log(result.data.msg)
    }
    catch(err){
        console.log(err);
    }
})