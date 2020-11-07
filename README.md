# Steganosaurus

<h3 align="center">STEGANOSAURUS</h3>

  <p align="center">
    An app for encoding messages into pictures using steganography. See the [demonstration](#demonstration) for more. 
    <br/>
    <a href="https://github.com/PeterGSWhite/steganosaurus"><strong>Explore the docs »</strong></a>
    
  </p>

### Built With

* Flask
* React

### Prerequisites

* npm
```sh
npm install npm@latest -g
```
* yarn
```
https://classic.yarnpkg.com/en/docs/install/#windows-stable
```
* Python3
```
https://www.python.org/download/releases/3.0/
```

### Installation

1. Clone the repo
```
git clone https://github.com/PeterGSWhite/steganosaurus.git
```
2. Install NPM packages
```
cd steganosaurus/react-api
yarn install
```
3. \[/react-api/] Create venv and install python modules
```
python3 -m venv api/venv
(POSIX)	source api/venv/bin/activate
(Windows) api/venv/Scripts/activate
pip install -r api/requirements.txt
```
4. \[/react-api/] Start the front-end
```
yarn start
```
5. \[/react-api/] Start the back-end
```
(POSIX) yarn start-api
(Windows) yarn start-api-windows
```

<!-- demonstration -->
### Demonstration

# Encoding data into an image

![demonstration of encoding data into an image](https://github.com/PeterGSWhite/steganosaurus/blob/main/encode.gif)

# Decoding data from an image

![demonstration of decoding data from an image](https://github.com/PeterGSWhite/steganosaurus/blob/main/decode.gif)
