import * as React from "react";
import DisplayWords from "./DisplayWords";

type S = {
    correct: any;
    randomWord: {
        _id?: number;
        word?: string;
        translation?: string;
    };
    prevWord: {
        word: string;
        translation: string;
    };
    tempWord: string;
    list: any[];
}

type P = any;

class GuessWords extends React.Component<P,S> {
    readonly state = {
        correct: undefined,
        randomWord: {
            word: "",
            translation: "",
        },
        prevWord: {
            word: "",
            translation: "",
        },
        tempWord: "",
        list: [],
    } as S;
    constructor(props: P) {
        super(props);
    }

    // componentDidMount() {
    //     this.pickWord();
    // }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            list: nextProps.data
        }, () => {
            if (this.state.list[0]) {
                this.pickWord()
                return;
            }
            return;
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        const {tempWord, randomWord, list} = this.state;
        if(randomWord === undefined) {
            if(list[0]) {
                this.pickWord()
                return;
            }
            alert("Use another list to restart")
            return;
        }
        if(tempWord === randomWord.translation) {
             this.setState({
                correct: true,
            });
            this.removeWord();
            this.clearTempWord();
        } else {
            this.setState({
                correct: false,
                
            })
            this.pickWord();
            this.clearTempWord();
        }
    }

    handleChange = (event: any) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        } as S)
    }

    clearTempWord = () => {
        this.setState({
            tempWord: "",
        })
    }

    pickRandomIndex = () => {
        let randomNum = Math.floor(Math.random()*this.state.list.length);
        return randomNum;
    }

    pickWord = () => {
        let r = this.pickRandomIndex();
        this.setState((prevState) => {
           return {
               randomWord: this.state.list[r],
               prevWord: prevState.randomWord 
            } as any;
        })
    }

    removeWord = () => {
        this.setState(prevState => {
            let word = prevState.randomWord;
            let arr = prevState.list;
            return {
                list: arr.filter(item => item.word !== word.word)
            }
        }, () => {
            if(this.state.list[0] === undefined) {
                return;
            }
            this.pickWord()
        });
    }

    render() {
        let items = this.state.list;
        let wrong = () => {
            if(!this.state.prevWord) {
                return(
                    <span style={{color: "red"}}></span>
                )
            }
            return (<span style={{color: "red"}}>Wrong! {this.state.prevWord.word} - {this.state.prevWord.translation}</span>)
        }
        return (
            <div className="guess-words-body">
                <ul>
                    {items.map((item: any) => <DisplayWords key={item._id} data={item}/>)}
                </ul>
                <br />
                <div className="guess-words-title">{
                    this.state.randomWord !== undefined ? 
                    <h1>Guess this word: <span style={{textDecoration: "italic"}}>{this.state.randomWord.word}</span></h1> : 
                    <h1>Play again?</h1>
                }
                </div>
                    <h1 className="answer-feedback">
                        {/* conditional rendering for answer feedback */}
                        {
                            this.state.correct ? 
                            <span style={{color: "green"}}>Correct!</span> : 
                            wrong()
                        }
                    </h1>
                <div className="guess-words">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            name="tempWord"
                            placeholder="guess"
                            value={this.state.tempWord}
                            onChange={this.handleChange}
                        />
                        <button>Guess</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default GuessWords;