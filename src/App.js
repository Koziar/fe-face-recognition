import { Component } from 'react';
import Particles from 'react-particles-js';
import { Navigation, Logo, Rank, ImageURLForm, FaceRecognition, SignIn } from './components';

import './App.css';

const particlesParams = {
    particles: {
        number: {
            value: 70,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'grab',
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
            boxes: [],
        };
    }

    calculateFaceLocation = (data) => {
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        const clarifaiFaces = data.outputs[0].data.regions;

        return clarifaiFaces.map((clarifaiFace) => {
            const boxCoordinates = clarifaiFace.region_info.bounding_box;

            return {
                leftCol: boxCoordinates.left_col * width,
                topRow: boxCoordinates.top_row * height,
                rightCol: width - boxCoordinates.right_col * width,
                bottomRow: height - boxCoordinates.bottom_row * height,
            };
        });
    };

    displayFaceBoxes = (boxes) => {
        this.setState({ boxes });
    };

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
        fetch('https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs', requestOptions)
            .then((response) => response.json())
            .then((result) => this.displayFaceBoxes(this.calculateFaceLocation(result)))
            .catch((error) => console.log('error', error));
    };

    render() {
        return (
            <div className="App">
                <Particles className="particles" params={particlesParams} />
                <SignIn />
                <header className="App-header">
                    <Navigation />
                    <Logo />
                    <Rank />
                    <ImageURLForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
                </header>
            </div>
        );
    }
}

export default App;
