import React, { Component } from 'react'

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
class Decode extends Component {
    state = {
        seed: '',
        data: '',
        picPreview: null,
        picFile: null,
        buttonmessage: 'Decode the data!',
        buttondisabled: false
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
        this.setState({
            buttonmessage: 'Loading...⌛',
            buttondisabled: true
        })
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
                <h4>Decode</h4>
                <form onSubmit={this.handleSubmit}>
                <p>First, enter the seed which was used in the encoding stage. If the seed is wrong, you will get gibberish back!</p>
                    <label htmlFor="seed">Enter seed for decryption</label>
                    <input type="text" id="seed" onChange={this.handleChange} autocomplete="off" onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                      }}/>
                    <p>Next, upload the .PNG image which has the data hidden inside it.  <br/><br/><input type="file" onChange={this.handleImage}/></p>
                    {this.state.picPreview
                    ?<img src={this.state.picPreview} alt="There is data hidden here"/>
                    : null
                    }
                    <br/><br></br><button disabled={this.state.buttondisabled}>{this.state.buttonmessage}</button>
                </form>
            </div>
        ) : (
            <div className="container">
                <p>The message is:</p><br/>
                <pre className="left-align">{this.state.data}</pre>
                <button variant="primary" 
                    onClick={() => {
                        this.setState({
                            pic: null, 
                            data: '', 
                            picFile: null,
                            buttonmessage: 'Decode the data!',
                            buttondisabled: false
                        })
                    }}>Decode another image?</button>
                
            </div>
        )
    }
}

export default Decode