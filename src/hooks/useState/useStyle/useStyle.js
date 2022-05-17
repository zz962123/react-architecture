import { useEffect, useState } from 'react'

function useStyle(userName) {

    console.log("hook test : ")

    const [style, setStyle] = useState("");
 
    useEffect(()=>{
        if(userName === "내 이름") {
            setStyle("login")
        } else {
            setStyle("logout")
        }
    }, [userName])

    return style
}

export default useStyle; 