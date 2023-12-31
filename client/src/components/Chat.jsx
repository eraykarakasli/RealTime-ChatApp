import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {
    const [saatDakika, setSaatDakika] = useState("")
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('messageReturn', (data) => {
            setMessageList((prev) => [...prev, data])
        })
        const interval = setInterval(() => {

            const now = new Date();
            const saat = now.getHours();
            const dakika = now.getMinutes();
            setSaatDakika(`${saat}:${String(dakika).padStart(2, "0")}`);
        }, 1000);
        return () => clearInterval(interval);
        
    }, [socket])

    const sendMessage = async () => {
        const messageContent = {
            username: username,
            message: message,
            room: room,
            date: saatDakika,
        }
        await socket.emit('message', messageContent)
        setMessageList((prev) => [...prev, messageContent])
        setMessage('')
    }
    
    return (
        <div className=' flex items-center justify-center h-full '>
            <div className='w-1/3 h-[800px] bg-[url(https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png)] relative rounded-lg'>
                <div className='w-full h-20 bg-gray-800 flex items-center p-2 rounded-lg'>
                    <div className='w-16 h-16 bg-white  rounded-full'>
                        <img className=' rounded-full' src="data:image/jpeg;base64,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" alt="a" />
                    </div>
                    <div className='ml-4 text-bold text-lg text-white  flex gap-12'>
                         <div>{username.toUpperCase()}</div><div> Room:{room} </div>
                    </div>
                </div>
                <div className='w-full h-[650px] overflow-y-auto'>
                    {
                        messageList && messageList.map((msg, i) => (
                            <div className={`${username === msg.username ? "flex justify-end " : " "}`} key={i}>
                                <div className={`${username === msg.username ? "w-1/2  bg-green-800 text-white text-sm m-2 rounded-lg p-2 rounded-br-none" : "w-1/2  bg-blue-800 text-white text-sm m-2 rounded-lg p-2 rounded-bl-none "}   `}>
                                    <div>
                                        {msg.message}
                                    </div>
                                    <div className='w-full flex justify-end text-xs opacity-50 mt-2'>
                                        {msg.username} - {msg.date}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='absolute bottom-0 left-0 w-full'>
                    <input value={message} onChange={e => setMessage(e.target.value)} className='w-3/4 h-12 border p-3 rounded-md outline-none' type="text" placeholder='message send' />
                    <button onClick={sendMessage} className='w-1/4 border bg-indigo-800 text-white h-12 hover:opacity-10 rounded-md absolute z-10'>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Chat