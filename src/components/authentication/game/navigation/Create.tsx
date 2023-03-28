import React from "react"
import { SetterContext } from ".."
import { ApplicationContext, SocketContext } from "../../../../App"

interface CreateProps {
}

export const Create = (props: CreateProps) => {
    const socket = React.useContext(SocketContext)
    const context = React.useContext(ApplicationContext)
    const setterContext = React.useContext(SetterContext) 

    const createRoom = (betAmount: number) => {
        if (context == null || setterContext == null) return;
        if (context.getter.userWithBalance == null) return;
        const address = context.getter.userWithBalance.user.address;
        socket.emit('create new room request', betAmount, address);
    }
    //default is 0.1
    let betAmount = 0.1
    return (
        <div className='Create'>
            <div onChange={(event: React.ChangeEvent<HTMLInputElement>) => betAmount = Number.parseFloat(event.target.value)}>
                <input type="radio" value="0.1" name="betAmount" defaultChecked /> 0.1
                <input type="radio" value="0.2" name="betAmount" /> 0.2
                <input type="radio" value="0.5" name="betAmount" /> 0.5
                <input type="radio" value="1" name="betAmount" /> 1
                <input type="radio" value="2" name="betAmount" /> 2
            </div>
            <div className='Create'>
                <button onClick={
                    () => { createRoom(betAmount) }
                }> Create New Room </button>
            </div>
        </div>
    )
}
