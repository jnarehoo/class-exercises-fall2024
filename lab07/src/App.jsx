import ButtonCount from "./ButtonCount.jsx";
import Profile from  "./Profile.jsx";
import React from "react";

 export default function App() {
    {/* The next four lines chatGPT helped me write*/}
    const people = [
        { name: "Taj", image_url: "https://example.com/alice.jpg" },
        { name: "Vinny", image_url: "https://example.com/bob.jpg" },
    ];

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                <p>Hello React!</p>
                {/* expressions are embedded in curly braces in JSX */}
                {people.map((person) => (
                    <Profile
                        name={person.name}
                        picture={person.image_url}
                    />
                ))}
                <ButtonCount initialCount = {1} />
                <ButtonCount initialCount = {2}/>
                <ButtonCount initialCount = {3}/>
                <ButtonCount initialCount = {4}/>
                <ButtonCount initialCount = {5}/>
                <ButtonCount initialCount = {6}/>
             </main>
         </>
     );
 }