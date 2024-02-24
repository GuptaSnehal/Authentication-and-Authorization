import axios from 'axios';
import { createContext, useState , useEffect} from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(!user){  // we dont want to use async and await in useEffect so we are using .then 
            axios.get('/profile').then(({data}) =>{
                setUser(data);
            })
        }
    }, [user])

    return (
        <UserContext.Provider value= {{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}