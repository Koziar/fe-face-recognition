import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageURLForm from './components/ImageURLForm/ImageURLForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import { Component } from 'react';

const particlesParams = {
    polygon: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
        };
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });

        const raw = JSON.stringify({
            user_app_id: {
                user_id: '{CLARIFAI_USER_ID}',
                app_id: '{CLARIFAI_APP_ID}',
            },
            inputs: [
                {
                    data: {
                        image: {
                            url: this.state.input,
                        },
                    },
                },
            ],
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Key {CLARIFAI_AUTH_KEY}}',
            },
            body: raw,
        };
        // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
        // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
        // this will default to the latest version_id
        fetch('https://api.clarifai.com/v2/models/e15d0f873e66047e579f90cf82c9882z/outputs', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(JSON.parse(result, null, 2).outputs[0].data))
            .catch((error) => console.log('error', error));
    };

    render() {
        return (
            <div className="App">
                <Particles className="particles" params={particlesParams} />
                <header className="App-header">
                    <Navigation />
                    <Logo />
                    <Rank />
                    <ImageURLForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition imageUrl={this.state.imageUrl} />
                </header>
            </div>
        );
    }
}

export default App;
