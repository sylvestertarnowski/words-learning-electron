import * as React from "react";

type P = {
    data: {
        word: string;
    }
}

const DisplayWords: React.FC<P> = (props) => {
    return (
        <li>{props.data.word}</li>    
    )
}

export default DisplayWords;