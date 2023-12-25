//import { io } from 'socket.io-client';
import './App.css'

function App() {

  // const URL = 'https://chat-web-342z.onrender.com';
  // const socket = io(URL);

  // socket.on('connect', ()=>{
  //   console.log('connected')
  // });
  // socket.on('disconnect',()=>{
  //   console.log('disconnected')
  // });


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.input.value) {
      //socket.emit('chat message', form.input.value);
      form.reset();
    }
  }

  return (
    <>

      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type="text" name='input' />
          <button type='submit'>send</button>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
