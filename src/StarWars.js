import './App.css';
import React from 'react';


class CharacterInfo extends React.Component {
    render() {
        return (
            <div className='info'>
                <h3 className='header'>Character Info:</h3>
                <h4>{this.props.character.name}</h4>
                <p>Species: {this.props.character.species}</p>
                <p>Homeworld: {this.props.homeworld}</p>
                <p>Born: {this.props.character.born}</p>
                <p>Died: {this.props.character.died}</p>
                <p>Mass: {this.props.character.mass}</p>
            </div>
        )
    }
}

class CharacterImages extends React.Component {
    render() {

        return (
            <div>
                <img className='image' src={this.props.url} alt={''}></img>
            </div>
        )
    }
}

class AffiliationsList extends React.Component {

    render() {

        const affiliations = this.props.affiliations.map((name, i) => {
            return (<li key={i} className='link'>{name}</li>)
        });

        return (
            <div className='affiliation'>
                <h3 className='header'>Affiliations:</h3>
                <ul className='list'>{affiliations}</ul>
            </div>

        )
    }
}

class StarWars extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loadedCharacter: false,
            image: null,
            name: null,
            species: null,
            homeworld: null,
            born: null,
            died: null,
            mass: null,
            affiliations: []
        }
    }

    getNewCharacter() {
        const randomNumber = Math.round(Math.random() * 83);
        const url = `https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`;
        fetch(url)
            .then(Response => Response.json())
            .then(data => {
                this.setState({
                    image: data.image,
                    name: data.name,
                    species: data.species,
                    homeworld: data.homeworld,
                    born: data.born,
                    died: data.died,
                    mass: data.mass,
                    affiliations: data.affiliations,
                    loadedCharacter: true,
                })
            })
    }
    render() {


        return (
            <div className='container'>
                {
                    this.state.loadedCharacter &&

                    <div className='main-container'>
                        <CharacterInfo character={this.state} />
                        <CharacterImages url={this.state.image} />
                        <AffiliationsList affiliations={this.state.affiliations} />
                    </div>
                }
                <div className='button'>
                    <button className='btn' type='button' onClick={() => this.getNewCharacter()}>Randomize Characters</button>
                </div>
            </div>
        )
    }
}

export default StarWars;