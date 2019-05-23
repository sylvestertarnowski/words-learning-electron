import React, {Component} from "react";
import GuessWords from "./GuessWords";
import PostWords from "./PostWords";

type S = {
    word: string;
    translation: string;
    wordsList: any[];
    list: any[];
    deleteReqResponse: string;
}

type P = any;

class Words extends Component<P, S> {
    readonly state = {
        word: "",
        translation: "",
        wordsList: [],
        list: [],
        deleteReqResponse: ""
    }
    constructor(props: P) {
        super(props);
    }

    downloadAllLists = () => {
        fetch('/words/all', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ wordsList: data }))
        .catch(err => console.error(err));
    }

    useSelectedList = (event: any) => {
        const listName = event.target.name;
        console.log(listName);
        fetch('/words/find?name=' + listName, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(data => this.setState({ list: data.list}))
        .catch(err => console.error(err));
    }

    deleteSelectedList = (event: any) => {
        const listName = event.target.name;
        console.log(listName);
        fetch('/words/delete?name=' + listName, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => this.setState({ deleteReqResponse: data }, () => this.findAndDeleteList(listName)))
        .then(() => console.log(this.state.deleteReqResponse))
        .then(() => console.log(`The list called "${listName}" was deleted sucessfully!`))
        .catch(err => console.error(err))
    }

    findAndDeleteList = (name: string) => {
        const lists: any = this.state.wordsList;
        const filteredList = lists.filter((list: any) => list.name!==name);
        this.setState({
            wordsList: filteredList
        })
    }

    handleSubmit = (event: any) => {
        this.setState((prevState) => {
            const newWord = {
                word: prevState.word,
                translation: prevState.translation
            }
            const newList = prevState.list;
            newList.unshift(newWord);
            return ({
                word: "",
                translation: "",
                list: newList,
            } as S)
        });
        console.log(this.state.list)
        event.preventDefault();
    }

    handleChange = (event: any) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        } as S)
    }

    render() {
        let items = this.state.wordsList;

        let arrayOfWords = items.map((item: any) => 
                <li key={item._id} className="lists-of-words">
                    <span className="list-span">List name: {item.name} - Language: {item.language}</span>
                    <button name={item.name} className="list-button" onClick={this.useSelectedList}>Use</button>
                    <button name={item.name} className="list-button" onClick={this.deleteSelectedList}>Delete</button>
                </li>
            )
        return (
            <div className="words-item">
                <div className="add-words-form">
                    <div className="add-words-form-title">
                        <h2>Add word to list</h2>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            autoFocus
                            type="text" 
                            name="word"
                            value={this.state.word} 
                            placeholder="Word"
                            onChange={this.handleChange}
                        />
                        <input 
                            type="text"
                            name="translation" 
                            value={this.state.translation}
                            placeholder="translation"
                            onChange={this.handleChange}
                        />
                        <button>Add</button>
                    </form>
                    <button onClick={this.downloadAllLists}>Display all saved lists</button>
                    <ul>
                        {arrayOfWords}
                    </ul>
                </div> 
                <PostWords data={this.state.list} />
                <GuessWords data={this.state.list} />
            </div>
        )
    }
}

export default Words;