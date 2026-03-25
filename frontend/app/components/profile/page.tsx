export default function ProfilePage({name,age} : {name : string, age : number}){
  return(
    <div>
      <h1>Profile</h1>
      <p>
        My name is {name} and I am {age} years old.
      </p>
    </div>
  );
} 