import React, { FC, useEffect, useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { SearchBar } from '../../molecules/SearchBar/SearchBar'
import { Player } from '../../../Interfaces/Interfaces'
import './Home.scss'
import { UserService } from '../../../services/user.service'
import DeleteIcon from '../../../assets/delete-icon.svg'
import EditIcon from '../../../assets/edit-icon.svg'
import { Modal } from '../Modal/Modal'

export interface HomeProps {
  some?: string
}

export const Home: FC<HomeProps> = (props: HomeProps) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [stateModal, setStateModal] = useState(false)
  const [items, setItems] = useState({})
  const [edit, setEdit] = useState(false)
  const [idEdit, setIdEdit] = useState('')

  useEffect(() => {
    UserService.getMyPlayers()
      .then((response) => {
        setPlayers(response)
      })
      .catch(() => {})
  }, [])
  return (
    <>
      <Header principalText="Mi Equipo"></Header>
      <SearchBar setStateModal={setStateModal} />
      <section className="home__board">
        <section className="home__card">
          {players.map((option: Player, item) => {
            return (
              <section key={item} className="home__player">
                <img className="home__image" src={option.image}></img>
                <p className="home__name-player">{option.firstName + ' ' + option.lastName}</p>
                <p className="home__second-name-player">{}</p>
                <div className="home__items-player">
                  <div>
                    <p>Ataque</p>
                    <p className="home__numbers-player">{option.attack}</p>
                  </div>
                  <div>
                    <p>Defensa</p>
                    <p className="home__numbers-player">{option.defense}</p>
                  </div>
                  <div>
                    <p>Skills</p>
                    <p className="home__numbers-player">{option.skills}</p>
                  </div>
                </div>
                <section className="home__options-player">
                  <img src={DeleteIcon} alt="delete-icon" />
                  <img src={EditIcon} alt="edit-icon" />
                </section>
              </section>
            )
          })}
        </section>
      </section>
      <Modal
        stateModal={stateModal}
        setStateModal={setStateModal}
        items={items}
        setItems={setItems}
        edit={edit}
        idEdit={idEdit}
      ></Modal>
    </>
  )
}
