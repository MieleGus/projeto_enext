import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './styles.scss'
import './global.css'


function App() {
  const [breeds, setBreeds] = useState([])
  const [image, setImage] = useState()

  const breedsArray = Object.keys(breeds)
  const fonts = ['bebas', 'chelsea', 'heebo', 'piedra', 'roboto']
  const colors = ['red', 'blue', 'green', 'gray', 'black']
  const date = new Date()

  const initialStateDogName = localStorage.getItem('DogName') || ''
  const initialStateBreed = localStorage.getItem('Breed') || ''
  const initialStateFont = localStorage.getItem('Font') || fonts
  const initialStateColor = localStorage.getItem('Color') || colors

  const [dogName, setDogName] = useState(initialStateDogName)
  const [breed, setBreed] = useState(initialStateBreed)
  const [font, setFont] = useState(initialStateFont)
  const [color, setColor] = useState(initialStateColor)
  const [loading, setLoading] = useState(false)
  

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
      setLoading(true)
      await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => {
          setImage(res.data.message)
          setLoading(false)
        })
    }
    getImage()
  }, [breed])

    function handleNewSubmit(e) {
    try {
      e.preventDefault()
      localStorage.setItem('DogName', dogName)
      localStorage.setItem('Breed', breed)
      localStorage.setItem('Font', font)
      localStorage.setItem('Color', color)
      localStorage.setItem('Date', date)
      console.log("Informações adicionadas no localstorage, em:", date)
    } catch(e) {
      console.log("Erro:", e)
    }
  }

  function HandleBreedChange(e) {
    e.preventDefault()
    setBreed(e.target.value)
  }

  function HandleFontChange(e) {
    e.preventDefault()
    setFont(e.target.value)
  }

  function HandleColorChange(e) {
    e.preventDefault()
    setColor(e.target.value)
  }

  return (
    <div className="container-fluid">
      <section className="form_dog">
        <form onSubmit={handleNewSubmit}>
          <div className="form-group">
            <label className="labelForm" htmlFor="">Nome do cachorro:</label>
            <input className="form-control"  name="dog_name" id="dog_name" value={dogName} onChange={e => setDogName(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="labelForm" htmlFor="">Raça do cachorro:</label>
            <select  className="form-control" onChange={HandleBreedChange} value={breed}>
              <option></option>
              { breedsArray.map((breeds, key) => (
                  <option value={breeds} key={key}>{breeds}</option>
                ))
              } 
            </select>
          </div>

          <div className="form-group">
            <label className="labelForm" htmlFor="">Fonte do texto:</label>
            <select className="form-control"  onChange={HandleFontChange} value={font}>
              <option></option>
              { fonts.map((font, key) => (
                  <option className={font} value={font} key={key}>{font}</option>
                ))
              } 
            </select>
          </div>

          <div className="form-group">
            <label className="labelForm" htmlFor="">Cor do texto:</label>
            <select className="form-control" onChange={HandleColorChange} value={color}>
              <option></option>
              { colors.map((color, key) => (
                  <option className={color} value={color} key={key}>{color}</option>
                ))
              } 
            </select>
          </div>

          <button className="btn btn-light mt-2" type="submit">Salvar</button>

          {loading ? 
          <div className="text-center">
            <div className="text-center spinner-border text-dark mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div> 
          </div>
        : 
          <div className="mt-3 text-center">
            <h1 className={font}>
              <span className={color}>
                {dogName}
              </span>
            </h1>
            <img src={image} className="text-center img-fluid" alt="dog_image"/>
          </div>
        }
        </form>
      </section>
    </div>
  );
}

export default App;
