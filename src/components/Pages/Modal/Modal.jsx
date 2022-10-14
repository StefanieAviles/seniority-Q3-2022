import './Modal.css'
import { useRef, useState } from 'react'
import { UserService } from '../../../services/user.service'
import CloseIcon from '../../../assets/close-icon.svg'
import Slider from '../../atoms/slider/slider'

export function Modal({ stateModal, setStateModal, items, setItems, edit, idEdit }) {
  const nameRef = useRef()
  const secondNameRef = useRef()
  const urlRef = useRef()
  const attackRef = useRef()
  const defenseRef = useRef()
  const skillsRef = useRef()
  const positionRef = useRef()
  const [nameError, setNameError] = useState('')
  const [urlError, setUrlError] = useState('')

  function closeModal() {
    setStateModal(false)
    setNameError('')
    setUrlError('')
  }
  function createPlayer() {
    setNameError('')
    setUrlError('')
    if (nameRef.current.value === '') {
      setNameError('* Campo requerido')
    }
    if (urlRef.current.value === '') {
      setUrlError('* Campo requerido')
    }
    if (nameRef.current.value !== '' && urlRef.current.value !== '') {
      if (!edit) {
        console.log(nameRef.current.value)
        const playerNew = {
          id: Math.floor(Math.random() * (1000 - 1) + 1),
          firstName: nameRef.current.value,
          lastName: secondNameRef.current.value,
          image: urlRef.current.value,
          attack: parseInt(attackRef.current.value),
          defense: parseInt(defenseRef.current.value),
          skills: parseInt(skillsRef.current.value),
          idAuthor: 51,
          idPosition: 7
        }
        UserService.createPlayer(playerNew)
      } else {
        const playerNew = {
          id: idEdit,
          firstName: nameRef.current.value,
          lastName: secondNameRef.current.value,
          image: urlRef.current.value,
          attack: parseInt(attackRef.current.value),
          defense: parseInt(defenseRef.current.value),
          skills: parseInt(skillsRef.current.value),
          idAuthor: 51,
          idPosition: positionRef.current.value
        }
        console.log(playerNew)
        console.log(idEdit)
        //editPlayer(playerNew, idEdit)
      }
      setStateModal(false)
    }
  }

  return (
    <>
      {stateModal && (
        <section className="overlay">
          <div className="modalContainer">
            <h2>Agregar Jugador</h2>
            <img src={CloseIcon} alt="close-icon" className="closeIcon" onClick={closeModal} />
            <div className="setPlayer">
              <label>Nombre:</label>
              <input
                ref={nameRef}
                type="text"
                placeholder="nombre"
                onChange={(e) => setItems(e.target.value)}
                value={items.name}
              ></input>
              <label>Apellido:</label>
              <input
                ref={secondNameRef}
                type="text"
                placeholder="Apellido"
                onChange={(e) => setItems(e.target.value)}
                value={items.secondName}
              ></input>
            </div>

            <div className="setPlayer">
              <label>Imagen:</label>
              <input
                ref={urlRef}
                type="text"
                placeholder="Ej. https//:somedir.com"
                onChange={(e) => setItems(e.target.value)}
                value={items.image}
              ></input>
              <label>Posición:</label>
              <input
                ref={positionRef}
                type="text"
                placeholder="Posicion"
                onChange={(e) => setItems(e.target.value)}
                value={items.idPosition}
              ></input>
            </div>
            <div>
              <Slider label="Ataque" ref={attackRef} onChange={(e) => setItems(e.target.value)} />
            </div>
            <div>
              <Slider label="Defensa" ref={defenseRef} onChange={(e) => setItems(e.target.value)} />
            </div>
            <div>
              <Slider label="Skills" ref={skillsRef} onChange={(e) => setItems(e.target.value)} />
            </div>
            <div>
              {!edit && <button onClick={createPlayer}>Guardar</button>}
              {edit && <button>Editar</button>}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
