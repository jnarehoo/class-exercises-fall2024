import Profile from  "./Profile.jsx";
import React from "react";

 export default function App() {

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                <p>Hello React!</p>
                <Profile name = "Taj" description = "Awesome" picture="https://picsum.photos/id/216/100/100"/>
                <Profile name = "Vinny" picture="https://picsum.photos/id/217/100/100"/>
                <Profile name = "Darcy"/>
                <Profile name = "Snips"/>
             </main>
         </>
     );
 }