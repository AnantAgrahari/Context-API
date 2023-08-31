import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";


 export const AppContext=createContext();                   
 function AppContextProvider({children}){
     const [loading,setLoading]=useState(false);          // In this Block only that things are used which are dynamic in nature//
     const [posts,setPosts]=useState([]);
     const [page,setPage]=useState(1);
     const [totalPages,setTotalPages]=useState(null);        //initially we initialise the pages with null as the pages are not fixed in the beginning//
 
     async function fetchBlogPosts(page=1){
        setLoading(true);
       let url=`${baseUrl}?page=${page}`;


        try {
            const result=await fetch(url);
            const data=await result.json();

            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
               setPage(1);
               setPosts([]);
               setTotalPages(null);   

        }
        setLoading(false);
     }




 const value={
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages
 };                                                         // In below code,data under value object is passed to the children(app.js) of appcontextprovider//
  return <AppContext.Provider value={value}>           
       {children}                                        
  </AppContext.Provider>

 }