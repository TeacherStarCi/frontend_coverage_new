import React from "react";
import { SocketContext } from "../../../App";
import { GameRoom } from "./gameroom/GameRoom";
import { Create, Join } from "./navigation"

interface WaitingRoomProps {
}
type Setter = React.Dispatch<React.SetStateAction<boolean>>
export const SetterContext = React.createContext<Setter | null>(null)
export const GameSection = (props: WaitingRoomProps) => {
    //false => waiting Room, true => gameRoom
    const [waitingRoom, setWaitingRoom] = React.useState<boolean>(false);
    const socket = React.useContext(SocketContext)
    const leaveRoom = () => {
        socket.emit('leave a room request');
    }

    React.useEffect(() => {
        socket.on('success to join the room', () => {
            setWaitingRoom(true)
        })

        socket.on('fail to join the room due to max player', () => {
            alert('Fail to join the room due to max player.')
        })
        socket.on('fail to join the room due to signed somewhere', () => {
            alert('Fail to join the room due to signed somewhere.')
        })
        socket.on('fail to create new room due to signed somewhere', () => {
            alert('Fail to create new room due to signed somewhere.')
        })
        socket.on('a player is lack of money', () => {
            alert('A player is lack of money.')
        })
        socket.on('throw error', (data: { message: string }) => {
            alert(data.message)
        })
    }, [socket])

    if (!waitingRoom) {
        return (
            <SetterContext.Provider value={setWaitingRoom}>
                <div className='GameSection'>
                    <Create></Create>
                    <Join></Join>
                </div>
            </SetterContext.Provider>
        )
    } else {
        return (
       
            <SetterContext.Provider value={setWaitingRoom}>
                <div className='GameSection'>
                   <button onClick = {() => {
                    setWaitingRoom(false);
                    leaveRoom();
                    }}> Back To Waiting Room </button>
                    <GameRoom> </GameRoom>
                </div>
            </SetterContext.Provider>
        )
    }
}
