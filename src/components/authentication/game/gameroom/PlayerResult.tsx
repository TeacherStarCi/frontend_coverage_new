import React from "react"
import { ApplicationContext, SocketContext } from "../../../../App"
import { Card, Hand, HandState, Player } from "../../../../type";
import { getPlayerCurrentPositionInRoom, getPlayerCurrentRoomIndex } from "../../../../utils";
import { DisplayCards } from "./DisplayCards";

interface PlayerResultProps {
    //true is your, false is not
    address: string | undefined | null
}
export const PlayerResult = (props: PlayerResultProps) => {
    const context = React.useContext(ApplicationContext)
    const socket = React.useContext(SocketContext)
    const [player, setPlayer] = React.useState<Player | null>(null)
    const [code, setCode] = React.useState('')
    const [cards, setCards] = React.useState<Card[]>([])
    const [host, setHost] = React.useState(false)
    const [isStart, setIsStart] = React.useState(true)

    React.useEffect(() => {
        socket.on('to terminate', () => {
            setIsStart(false);
        }
        )
    }, [socket])

    React.useEffect(() => {
        if (context == null) return;
        if (context.getter.roomSet == null
            || context.getter.userWithBalance == null
            || props.address == null
            || typeof props.address == 'undefined'
            || props.address === '') return;
        const playerIndex: number = getPlayerCurrentPositionInRoom(props.address, context.getter.roomSet);
        const roomIndex: number = getPlayerCurrentRoomIndex(props.address, context.getter.roomSet);
        if (playerIndex === -1 && roomIndex === -1) return
        setPlayer(context.getter.roomSet[roomIndex].players[playerIndex]);
        setCode(context.getter.roomSet[roomIndex].code);
        const hand: Hand | undefined = context.getter.roomSet[roomIndex].players[playerIndex].hand
        if (typeof hand != 'undefined') {
            setCards(hand.cards);
        } else {
            setCards([]);
        }
        const address = context.getter.userWithBalance.user.address;
        if (props.address === address && playerIndex === 0) {
            setHost(true);
        }
    }, [context, props.address])

    const displayHandstate = (handState: HandState | undefined | null): JSX.Element => {
        if (typeof handState == 'undefined' || handState == null) return (<div className='DisplayHandState'></div>);
        switch (handState.state) {
            case 'Base':
                return (<div className='DisplayHandState'>
                    HandState - State: {handState.state}, Level: {handState.level}
                </div>)
            case 'Flush':
                return (<div className='DisplayHandState'>
                    HandState - State: {handState.state}, Begin: {handState.begin}
                </div>);
            case 'ThreeFaceCards':
                return (<div className='DisplayHandState'>
                    HandState - State: {handState.state}
                </div>);
            case 'ThreeOfAKind':
                return (<div className='DisplayHandState'>
                    HandState - State: {handState.state}, Value: {handState.value}
                </div>);
            default:
                return (<div className='DisplayHandState'></div>);
        }
    }

    const startGame = (code: string): void => {
        socket.emit('start game request', code);
    }

    const terminateGame = (code: string): void => {
        socket.emit('terminate game request', code);
    }

    const displayButton = (host: boolean, isStart: boolean): JSX.Element => {
        if (!host) return (<div className='DisplayButton'></div>);
        if (isStart) {
            return (<div className='DisplayButton'>
                <button onClick={() => {
                    startGame(code);
                } 
                }> Start Game </button>
            </div>);
        } else {
            return (<div className='DisplayButton'>
                <button onClick={() => {
                    terminateGame(code);
                    setIsStart(true);
                }
                }> Terminate Game </button>
            </div>);
        }
    }

    const displayWinner = (isWinner: boolean | undefined | null): JSX.Element => {
        if (isWinner == null || typeof isWinner == 'undefined') {
            return (<div className='DisplayWinner'> </div>);
        }
        if (isWinner) {
            return (<div className='DisplayWinner'> You Win !</div>);
        }
        return (<div className='DisplayWinner'> You Lose !</div>);
    }

    return (<div className='HandResult'>
        Address: {player?.socketUser.user.address} <br />
        Username: {player?.socketUser.user.username} <br />
        Asset: {player?.socketUser.user.asset} <br />
        <DisplayCards {...{ cards: cards }}> </DisplayCards>
        {displayHandstate(player?.hand?.result)}
        {displayWinner(player?.hand?.isWinner)}
        {displayButton(host, isStart)}
    </div>)

}