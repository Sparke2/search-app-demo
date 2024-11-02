// import {useContext, useEffect, useState} from "react";
// import {useLocation} from "react-router-dom";
// import {createContext} from "./create-context";
//
//
// export const tokenContext = createContext<{token:string}>(null)
// export const useLogged = () => {
//     const token = useContext(tokenContext)?.token
//     return (token && typeof token === 'string')
// }
// export const {} = createContext<{logged:boolean}, {logout:() => void}>(v=> {
//     const params = useLocation();
//     const searchParams = new URLSearchParams(params.search)
//     const urlToken = searchParams.get('token')
//     const [token, setToken] = useState(urlToken)
//     useEffect(() => {
//         if(urlToken){
//             setToken(urlToken)
//         }
//     }, [urlToken])
//     return {logout : () => {}}
// })
// export const SessionProvider = () => {
//     const params = useLocation();
//     const [token, setToken] = useState<string>();
//     const searchParams = new URLSearchParams(params.search)
//     const tokenurl = searchParams.get('token')
//     useEffect(() => {
//         if(token){
//             setToken(tokenurl)
//             searchParams.delete('token')
//         }
//     }, [token])
// }
