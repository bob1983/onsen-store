import axios from 'axios'
import { Program } from './program'

const LIST_URL = 'http://www.onsen.ag/api/shownMovie/shownMovie.json'
const SHOW_URL_BASE = "http://www.onsen.ag/data/api/getMovieInfo"

export type Link = {
  imagePath: string
  url: string
}

type ListResponse = {
  result: string[]
}

export type ShowSuccessResponse = {
  type: string
  thumbnailPath: string
  moviePath: {
    pc: string
    iPhone: string
    Android: string
  }
  title: string
  personality: string
  guest: string
  update: string
  count: string
  schedule: string
  optionText: string
  mail: string
  copyright: string
  url: string
  link: Link[]
  recommendGoods: Link[]
  recommendMovie: Link[]
  cm: []
  allowExpand: string
}

type ShowErrorResponse = {
  error: string
}

const isErrorResponse = (arg: any): arg is ShowErrorResponse => {
    return arg.error !== undefined;
}

const showURL = (movieName: string) => {
  return `${SHOW_URL_BASE}/${movieName}`
}

const unwrapJsonp = <T>(jsonp: string): T => {
  const text = jsonp.slice(9, jsonp.length - 3)
  return JSON.parse(text)
}

export class OnsenClient {
  static client(): OnsenClient {
    return new OnsenClient(Program)
  }
  constructor(private programFactory: typeof Program) {}

  async fetchPrograms(): Promise<string[]> {
    try {
      const result = (await axios.get<ListResponse>(LIST_URL)).data.result
      return result
    } catch (error) {
      throw(error)
    }
  }

  async fetchProgram(titleAlias: string): Promise<Program> {
    const data = (await axios.get<string>(
      showURL(titleAlias)
    )).data
    const object = unwrapJsonp<ShowSuccessResponse|ShowErrorResponse>(data)
    if (isErrorResponse(object)) {
      throw new Error(`Program ${titleAlias} not found`)
    }
    return this.programFactory.program(object)
  }
}
