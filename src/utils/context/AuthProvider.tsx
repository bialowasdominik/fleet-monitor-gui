import { createContext, useState } from "react";
import User from "../../models/User";

export interface ContextModel{
    auth: User | undefined,
    setAuth:Function
}

const init = {
    auth: new User(),
    setAuth:()=>{}
}

const AuthContext = createContext<ContextModel>(init);

export const AuthProvider = ({children}:any) => {
    const [auth, setAuth] = useState<User>(new User());

    return(
        <AuthContext.Provider value = {{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;