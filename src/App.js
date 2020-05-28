import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './styles.scss'
import './global.css'
import Header from './elements/Header'


function App() {
  const [breeds, setBreeds] = useState([])
  const [image, setImage] = useState()

  const breedsArray = Object.keys(breeds)
  // const fontArray = Object.keys(font)

  const initialStateDogName = localStorage.getItem('DogName') || ''
  const initialStateBreed = localStorage.getItem('Breed') || ''
  // const initialStateFont = localStorage.getItem('Font') || ['bebas', 'chelsea', 'heebo', 'piedra', 'roboto']

  const [dogName, setDogName] = useState(initialStateDogName)
  const [breed, setBreed] = useState(initialStateBreed)
  // const [font, setFont] = useState(initialStateFont)
  

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
  
  useEffect(() => {
    const getImage = async () => {
      await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => {
          setImage(res.data.message)
          console.log(res)
        })
    }
    getImage()
  }, [breed])

    function handleNewSubmit(e) {
    e.preventDefault()
    localStorage.setItem('DogName', dogName)
    localStorage.setItem('Breed', breed)
    // localStorage.setItem('Font', font)
    console.log(breed)
  }

  function HandleBreedChange(e) {
    e.preventDefault()
    setBreed(e.target.value)
  }

  // function HandleFontChange(e) {
  //   e.preventDefault()
  //   setFont(e.target.value)
  // }

  return (
    <div className="container">
      <section className="form_dog">
        <form onSubmit={handleNewSubmit}>
          <div className="input-block">
            <label className="labelForm" htmlFor="">Nome do cachorro:</label>
            <input name="dog_name" id="dog_name" value={dogName} onChange={e => setDogName(e.target.value)} />
          </div>

          <div className="input-block">
            <label className="labelForm" htmlFor="">Raça do cachorro:</label>
            <select onChange={HandleBreedChange} value={breed}>
              <option></option>
              { breedsArray.map((breeds, key) => (
                  <option value={breeds} key={key}>{breeds}</option>
                ))
              } 
            </select>
          </div>

          {/* <div className="input-block">
            <label className="labelForm" htmlFor="">Fonte do texto:</label>
            <select onChange={HandleFontChange} value={font}>
              <option></option>
              { fontArray.map((font, key) => (
                  <option value={font} key={key}>{font}</option>
                ))
              } 
            </select>
          </div> */}

          <button type="submit">Salvar</button>
        </form>
        <img src={image}/>
      </section>
    </div>
  );
}

export default App;
