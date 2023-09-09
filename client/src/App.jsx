import { useState } from "react"
import Chat from "./components/Chat"
import Room from "./components/Room"
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000')

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="bg-gray-700 h-[100vh]">
      {
        !chatScreen ? <Room socket={socket} username={username} room={room} setUsername={setUsername} setRoom={setRoom} setChatScreen={setChatScreen} />
          :
          <Chat socket={socket} username={username} room={room} />
      }
    </div>
  )
}

export default App
