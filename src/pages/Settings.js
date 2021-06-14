import React, {useContext} from 'react'

export default function Settings(props) {
    console.log(props)
    // using the theme context from app.js 
    // const {darktheme , setDarktheme } = useContext(ThemeContext)

    return (
        <>
        <div>
            {/* <button onClick ={()=>setDarktheme(!darktheme)}>toggle theme</button> */}
        </div>
        
        </>
    )

}
