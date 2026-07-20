import { test, expect } from '@playwright/test';

test('get user with the phone number 1-770-736-8031 x56442',async({request})=>{
    const Date_first=Date.now();
    const response=await request.get('https://jsonplaceholder.typicode.com/users?phone=1-770-736-8031 x56442');
    console.log(response.status());
    const Body=await response.json();
    console.log(Body);
})
test('create a new user',async ({request})=>{
  const response=await request.post('https://jsonplaceholder.typicode.com/users',{
    data:{
      name:'Hello API testing',
      username:'Hello API testing',
      email:'HelloAPItesting@gmail.com',}

    });
    const body=await response.json();
    console.log(body);
    console.log(response.status());

})
test('update user by id=3',async ({request})=>{
    const response=await request.put('https://jsonplaceholder.typicode.com/users/3',{
data:{
    name:'Hello API testing',
    username:'Hello API testing',
    email: "",
    address: {},
    phone: "",
    website: "",
    company: {}
}
    });
    console.log(response.status());
    const body=await response.json();
    console.log(body);
    
})
test('update the name of the user by id=4',async ({request})=>{
    const response =await request.patch('https://jsonplaceholder.typicode.com/users/4',{
        data:{
            name:'only name updated'
        }
    });
    console.log(response.status());
    const body=await response.json();
    console.log(body);
})
test('delete the user by id=5',async ({request})=>{
    const response=await request.delete('https://jsonplaceholder.typicode.com/users/5');
    console.log(response.status());
    const body=await response.json();
    console.log(body);
})
test('get user with inexisting ID ',async({request})=>{
    const Date_first=Date.now();
    const response=await request.get('https://jsonplaceholder.typicode.com/users/999');
    console.log(response.status());
    const Body=await response.json();
    console.log(Body);
})
test.only('create a new user without a name ',async ({request})=>{
  const response=await request.post('https://jsonplaceholder.typicode.com/users',{
    data:{
        username:55,
        username:'Hello API testing',
        email:'HelloAPItesting',
     }

    });
    const body=await response.json();
    console.log(body);
    console.log(response.status());

})