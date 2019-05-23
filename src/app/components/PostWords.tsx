import * as React from "react";

type S = any;
type P = any;

class PostWords extends React.Component<P, S> {
    readonly state = {
        name: "",
        language: "",
        list: this.props.data
    }
    constructor(props: P) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            list: nextProps.data
        } as any)
    }

    handleSave(event: any) {
        event.preventDefault();
        fetch('/words/add', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

    handleChange(event: any) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render() { 
        return (
            <div className="post-words-items">
            <div className="add-words-form-title"><h2>Save words to Database</h2></div>
                <div className="post-words-form">
                    <input 
                        type="text" 
                        value={this.state.name} 
                        name="name" 
                        onChange={this.handleChange}
                        placeholder="Unique List Name" 
                    />
                    <input
                        type="text"
                        value={this.state.language}
                        name="language"
                        onChange={this.handleChange} 
                        placeholder="Language"
                    />
                    <button type="submit" onClick={this.handleSave}>Save Words</button>
                </div>
            </div>
        )   
    }
}

export default PostWords;