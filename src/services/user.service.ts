import axios, { AxiosResponse } from 'axios'
import { Player } from '../Interfaces/Interfaces'

const API_URL = process.env.REACT_APP_API_URL as string

export interface FirebaseWrapper<T> {
  data: T
}

export interface User {
  username: string
  email: string
  token: string
}

export class UserService {
  static async getUsers() {
    const response = await axios.get<User[]>(API_URL)
    return response.data
  }

  static async getMyPlayers() {
    const response: AxiosResponse<Player[]> = await axios.get(
      'https://api-exercise-q3.herokuapp.com/player',
      {
        headers: {
          author: '51'
        }
      }
    )
    return response.data
  }

  static async createPlayer(
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    attack: number,
    defense: number,
    skills: number,
    idAuthor: number,
    idPosition: number
  ) {
    const response = await axios.post('https://api-exercise-q3.herokuapp.com/player', {
      headers: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        image: image,
        attack: attack,
        defense: defense,
        skills: skills,
        idAuthor: idAuthor,
        idPosition: idPosition
      }
    })
    console.log(response.data)
    return response.data
  }
}
