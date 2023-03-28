import React from 'react';
import './App.css';
import { RoomSet, User } from './type';
import { SigningStargateClient } from '@cosmjs/stargate';
import { UnauthenticationSection } from './components/unauthentication';
import { AuthenticationSection } from './components/authentication';
import { io, Socket } from 'socket.io-client';
import { endpoint } from './constant';


type GetterContextType = {
  roomSet: RoomSet | null,
  client: SigningStargateClient | null,
  userWithBalance: UserWithBalance | null
}
type SetterContextType = {
  setRoomSet: React.Dispatch<React.SetStateAction<RoomSet | null>>,
  setClient: React.Dispatch<React.SetStateAction<SigningStargateClient | null>>,
  setUserWithBalance: React.Dispatch<React.SetStateAction<UserWithBalance | null>>
}

type ContextType = {
  getter: GetterContextType,
  setter: SetterContextType
}

type UserWithBalance = {
  user: User,
  balance: number
}

export const ApplicationContext = React.createContext<ContextType | null>(null)
const socket: Socket = io(endpoint + '/');
export const SocketContext = React.createContext<Socket>(socket)
function App() {
  //state
  const [roomSet, setRoomSet] = React.useState<RoomSet | null>(null)
  const [client, setClient] = React.useState<SigningStargateClient | null>(null)
  const [userWithBalance, setUserWithBalance] = React.useState<UserWithBalance | null>(null)
  
  //set value to context
  const contextValue: ContextType = {
    getter: {
      roomSet,
      client,
      userWithBalance
    },
    setter: {
      setRoomSet,
      setClient,
      setUserWithBalance
    }
  }
  
  // socket
  React.useEffect(() => {
    socket.emit('show available room request');
    socket.on('update room set', (roomSet: RoomSet) => {
      console.log('updated room set');
      console.log(roomSet);
      setRoomSet(roomSet);
    }
    )
}, [])

  if (userWithBalance == null) {
    return (
      <ApplicationContext.Provider value={contextValue}>
        <UnauthenticationSection> </UnauthenticationSection>
      </ApplicationContext.Provider>
    )
  } else {
    return (
      <ApplicationContext.Provider value={contextValue}>
        <AuthenticationSection> </AuthenticationSection>
      </ApplicationContext.Provider>
    )
  }
}

export default App;
