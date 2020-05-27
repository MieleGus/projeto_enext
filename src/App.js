import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './styles.scss'
import './global.css'
import Header from './elements/Header'


function App() {
  const [breeds, setBreeds] = useState([])
  const [image, setImage] = useState()

  const breedsArray = Object.keys(breeds)

  const initialStateDogName = localStorage.getItem('DogName') || ''
  const initialStateBreed = localStorage.getItem('Breed') || ''

  const [dogName, setDogName] = useState(initialStateDogName)
  const [breed, setBreedLocalStorage] = useState(initialStateBreed)

  useEffect(() => {
    const getDogs = async () => {
      await axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
          setImage(res.data.message)
          console.log(res)
        })
    }
    getDogs()
  }, [])

  useEffect(() => {
    const getBreeds = async () => {
      await axios.get('https://dog.ceo/api/breeds/list/all')
        .then(res => {
          setBreeds(res.data.message)
          console.log(res)
        })
    }
    getBreeds()
  }, [])

 
    function handleNewSubmit(e) {
    e.preventDefault()
    localStorage.setItem('DogName', dogName)
    localStorage.setItem('Breed', breed)
    console.log(breed)
  }

  function HandleBreedChange(e) {
    e.preventDefault()
    setBreedLocalStorage(e.target.value)
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <section className="form_dog">
          <form onSubmit={handleNewSubmit}>
            <div className="input-block">
              <label htmlFor="">Nome do cachorro:</label>
              <input name="dog_name" id="dog_name" value={dogName} onChange={e => setDogName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="">Raça do cachorro:</label>
              <select onChange={HandleBreedChange} value={breed}>
                <option></option>
                { breedsArray.map((breeds, key) => (
                    <option value={breeds} key={key}>{breeds}</option>
                  ))
                } 
              </select>
            </div>
            <button type="submit">Salvar</button>
          </form>
          <img src={image}/>
        </section>
      </div>
    </div>
  );
}

export default App;
