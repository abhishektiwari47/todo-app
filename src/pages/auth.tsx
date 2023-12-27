import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useState } from "react";

function Auth(){
    const [login,setLogin] = useState(true)
    return (
        <div>
            {(login)?<Login/>:<Signup/>}
            <button onClick={()=>{setLogin(!login)}}>{(login)?"Signup":"Login"}</button>

        </div>
    )
}

export default Auth;