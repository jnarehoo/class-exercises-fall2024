import React, { useState } from "react";

export default function ButtonCount({ initialCount = 0 }) {
    // biggest idea in React is: state variables!
    // initialCount can be any number 
    const [count, setCount] = useState(initialCount);

    function addOne() {
        setCount(count + 1);
    }

    function resetCounter() {
        setCount(initialCount);
    }

    return (
        <div>
            <button onClick={addOne}>You have clicked {count} times</button>
            <button onClick={resetCounter}>reset</button>
        </div>
    );
}