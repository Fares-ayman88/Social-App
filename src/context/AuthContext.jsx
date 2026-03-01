import { createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
export const AuthContext = createContext();
// This component will wrap around the entire app and provide the authentication context to all child components.
// ال {children} جايلي ك بروبس من الاب اللي هو ال App.jsx وهو عبارة عن كل حاجة جوه ال AuthProvider في ال App.jsx
export default function AuthProvider({children}) {
    const [userToken, setuserToken] = useState( ()=>localStorage.getItem("token") );
    // const [userToken, setuserToken] = useState(null)

    // // When the AuthProvider component mounts, check if there's a token in localStorage and set it to state if it exists.
    // useEffect(() => {
    //     // Check localStorage for a saved token when the component mounts.
    //   const savedToken = localStorage.getItem("userToken");
    //  // If a token is found, update the state with the saved token.
    //   if (savedToken) {
    //     setuserToken(savedToken);
    //   }
    
    // }, [])
    const [userId, setUserId] = useState("")


     function saveUserToken(token) {
        setuserToken(token)
        // Save the token to localStorage so it persists across page reloads.
      localStorage.setItem("token", token);
     }

     function clearUserToken() {
        setuserToken(null);
        localStorage.removeItem("token");
     }
   
// console.log("AuthContext rendered, current token:", userToken);

useEffect(() => {
  if(userToken){
  const decoded =  jwtDecode(userToken)
  // console.log("decooodeddddd",decoded)
  setUserId(decoded.user)
  }
}, [userToken])


  return (
    <AuthContext.Provider 
    value={{
       userToken
      , saveUserToken
      , clearUserToken
      ,userId
    }}
    
    >
        {children}
    </AuthContext.Provider>
  )
}
