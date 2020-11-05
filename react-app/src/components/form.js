import React, { Component, useEffect, useRef } from 'react'

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
class Form extends Component {
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
    handleImage = (e) => {
        let url = URL.createObjectURL(e.target.files[0])
        this.setState({
            pic: url
        })
        var form = new FormData()
        console.log(this.state.seed, e.target.files[0])
        form.append('image', e.target.files[0])
        form.append('seed', this.state.seed)
        fetch('/decode', {
            method: 'POST',
            body: form
        })
        //.then(validateResponse)
            .then(response => response.text())
            .then(response => {
                this.setState({ data: response})
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
        return(
            <div>
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
                <img src={this.state.pic}/>
                <input type="file" onChange={this.handleImage}/>
            </div>
        )
    }
}

export default Form