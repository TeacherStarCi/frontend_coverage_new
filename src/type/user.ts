export type Transaction = {
    txHash: string,
    sender: string,
    receiver: string,
    result: boolean,
    amount: number,
    fee: number,
    height: number,
    time: Date
}

export type User = {
    address: string,
    username: string,
    asset: number,
    deposits?: Transaction[],
    withdraws?: Transaction[]
}


export type SocketUser = {
    socketId: string,
    user: User,
    position: Position
}
export type Position = {
    location: 'waitingRoom'
} | {
    location: 'gameRoom'
    state: 'indie'|'inProgress'
}
   