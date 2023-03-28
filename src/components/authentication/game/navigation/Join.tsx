import React from "react"
import { SetterContext } from ".."
import { ApplicationContext, SocketContext } from "../../../../App"
import { Room, RoomSet } from "../../../../type"

interface JoinProps {
}

export const Join = (props: JoinProps) => {
    const socket = React.useContext(SocketContext)
    const context = React.useContext(ApplicationContext)
    const setterContext = React.useContext(SetterContext)
    //join room
    const joinRoom = (code: string) => {
        if (context == null || setterContext == null) return;
        if (context.getter.userWithBalance == null) return;
        const address = context.getter.userWithBalance.user.address;
        socket.emit('join an existed room request', code, address);
    }

    
    //show data
    const showTable = (roomSet: RoomSet | null | undefined): JSX.Element => {
        if (roomSet == null || typeof roomSet == 'undefined') return (
            <table className="showTable">
            </table>
        )
        return (
            <table className="ShowTable">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Code</th>
                        <th>Bet Amount</th>
                        <th>Number Of Player</th>
                        <th>Join</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roomSet.map((room: Room, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{room.code}</td>
                                    <td>{room.betAmount}</td>
                                    <td>{room.players.length}</td>
                                    <td> <button onClick={() => { joinRoom(room.code) }}> Join </button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
    const roomSet: RoomSet | null | undefined = context?.getter.roomSet
    return (
        <div className='Join'>
            {showTable(roomSet)}
        </div>
    )
}
