import React from 'react'

const Room = ({ username, setUsername, room, setRoom, setChatScreen, socket }) => {
  const sendRoom = () => {
      socket.emit('room', room)
      setChatScreen(true)
  }
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-1/3 h-[350px] bg-indigo-600 flex flex-col  space-y-4 p-3 rounded-xl ' >
        <h1 className='font-extrabold text-3xl flex justify-center m-4 '>Welcome to Chat!</h1>
        <input onChange={(e) => setUsername(e.target.value)} value={username} className='h-12 rounded-md p-3 outline-none' type="text" placeholder='Username' />
        <input onChange={(e) => setRoom(e.target.value)} className='h-12 rounded-md p-3 outline-none' type="text" placeholder='Room' />
        <div onClick={sendRoom} className='border h-12 p-2 text-xl text-center rounded-lg text-white cursor-pointer hover:bg-indigo-700'>Chatt!!</div>
      </div>

    </div>
  )
}

export default Room