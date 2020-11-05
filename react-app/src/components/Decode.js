import React, { Component } from 'react'

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
class Decode extends Component {
    state = {
        seed: null,
        data: null,
        picPreview: null,
        picFile: null
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleImage = (e) => {
        let url = URL.createObjectURL(e.target.files[0])
        this.setState({
            picPreview: url,
            picFile: e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var form = new FormData()
        form.append('image', this.state.picFile)
        form.append('seed', this.state.seed)
        fetch('/decode', {
            method: 'POST',
            body: form
        })
        .then(validateResponse)
            .then(response => response.text())
            .then(response => {
                this.setState({ data: response})
            })
    }

    render(){
        return !this.state.data ? (
            <div className="container"> 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="seed">Enter seed for decryption</label>
                    <input type="text" id="seed" onChange={this.handleChange}/>
                    <img src={this.state.picPreview}/>
                    <input type="file" onChange={this.handleImage}/>
                    <button>Submit</button>
                </form>
            </div>
        ) : (
            <div className="container">
                <p className="center">{this.state.data}</p>
                <button variant="primary" 
                    onClick={() => {
                        this.setState({
                            pic: null, 
                            data: null, 
                            picFile: null
                        })
                    }}>Decode another image?</button>
                
            </div>
        )
    }
}

export default Decode