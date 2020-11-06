import React from 'react'

const About = () => {
    return (
        <div className="container left-align">
            <h4 > About</h4>
            <hr></hr>
            <h2>What does this App do?</h2>
            <p>Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video.<br/>
            This app allows a user to encode a message of their choosing within an image and to decode messages from images which were already encoded<br/>
            A seed can be used for the encoding, which will require an identical seed for decoding</p>
            <h2>How does it work?</h2>
            <ol>
                <li>The React front end posts the user supplied fields to a Flask API</li>
                <li>The Flask API retrieves a .PNG image from the <a target="_blank"  rel="noreferrer" href="https://picsum.photos/">LoremPicsum service</a> and encodes the data into it, then returns the image</li>
                <li>For decoding, the process works the same but in reverse</li>
            </ol>
            <p>The source code can be found on my <a target="_blank"  rel="noreferrer" href="https://github.com/PeterGSWhite/steganosaurus">Github repo</a></p>
        </div>
    )
}

export default About