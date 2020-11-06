import React, { Component, useState } from 'react'

class Encode extends Component {  
    state = {
        seed: '',
        data: '',
        pic: null,
        buttonmessage: 'Encode into an Image!',
        buttondisabled: false
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            buttonmessage: 'Loading...⌛',
            buttondisabled: true
        })
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
                <h4> Encode</h4>
                <form onSubmit={this.handleSubmit}>
                    <p>First, choose a seed which will be used in the steganography algorithm. You will need to remember it if you want to decode your image again!</p>
                    <label htmlFor="seed">Enter seed for encryption</label>
                    <input type="text" id="seed" onChange={this.handleChange} maxLength="100" onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}/>
                    <br></br>
                    <p>Next, enter the data you want to hide in an image. {this.state.data ? this.state.data.length : 0}/2777 characters</p>
                    <label htmlFor="data">Enter data to encrypt</label>
                    <textarea
                        id="data"
                        type="text"
                        placeholder="This data will be hidden in an image!"
                        onChange={this.handleChange}
                        value={this.state.data}
                        maxLength="2777"
                    />
                    {this.state.data ? this.state.data.length : null}
                    <button disabled={this.state.buttondisabled}>{this.state.buttonmessage}</button>
                </form>
            </div>
        ) : (
            <div className="container">
                <p>Here is your image! To test the decoding, make sure you save the image as a .PNG to preserve the encoding!</p>
                <p>Also don't forget your seed is {this.state.seed}</p>
                <img alt="There is data hidden here" src={this.state.pic}/><br/>
                <button variant="primary" 
                    onClick={() => {
                        this.setState({
                            pic: null, 
                            data: '', 
                            buttonmessage: 'Encode into an Image!',
                            buttondisabled: false
                        })
                    }}>Encode another image?</button>
            </div>
        )
    }
}

export default Encode