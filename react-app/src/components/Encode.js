import React, { Component } from 'react'

class Encode extends Component {  
    state = {
        seed: null,
        data: null,
        pic: null,
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ seed: this.state.seed, data: this.state.data }))
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({ seed: this.state.seed, data: this.state.data })
        };
        fetch('/encode', requestOptions)
            .then(response => response.blob())
            .then(blob => {
                this.setState({ pic: URL.createObjectURL(blob) })
            })
        

    }
    render(){
        // Only display the form if a picture isn't already on display
        return !this.state.pic ? (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="seed">Enter seed for encryption</label>
                    <input type="text" id="seed" onChange={this.handleChange}/>
                    <br></br>
                    <label htmlFor="data">Enter data to encrypt</label>
                    <input
                        id="data"
                        type="text"
                        maxLength="2777" // This is the most data which the encoding function can handle (picture service won't give larger pics)
                        placeholder="This data will be hidden in an image!"
                        onChange={this.handleChange}
                        value={this.state.data}
                    />
                    <button>Submit</button>
                </form>
            </div>
        ) : (
            <div className="container">
                <img src={this.state.pic}/>
                <button variant="primary" onClick={() => {this.setState({pic: null, data: null})}}>Encode another image?</button>
            </div>
        )
    }
}

export default Encode