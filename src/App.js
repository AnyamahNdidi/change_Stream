import logo from './logo.svg';
import './App.css';
import io from "socket.io-client"
import {useEffect, useState} from "react"
import axios from "axios"


function App() {
  const url = "http://localhost:2024"
  const [user, setUser] = useState()

  const fetchData = async ()=>{
    const res = await axios.get(url)
 
    if(res){
      setUser(res.data.data)
    }
  }

  const socket = io(url)

  socket.on("observer", (data)=>{
    console.log(data);
    setUser([...user, data])
  })

  // socket.on("observer", (data) => {
  //   console.log(data);

  //   // setUser([...user, data]);
  // });


  socket.on("observerDelete", (data)=>{
    const res = user.filter((el)=> el._id !== data) 
    setUser(res)
  })
  useEffect(()=>{ 
    fetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

          {
            user?.map((props)=>(
              <div key={props._id}>{props.fullName}</div>
            ))
          }
        </a>
      </header>
    </div>
  );
}

export default App;
