import 'reflect-metadata'
import {
  plainToClass,
  Expose,
  Transform
} from 'class-transformer'
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ja'
import { Link, ShowSuccessResponse } from './onsen_client'

dayjs.extend(customParseFormat)

const transformNames = (input: string): string[] => {
  if (input === '') {
    return []
  }
  const names = input.split('/')
  return names.map(name => name.replace(/(\s$|^\s)/g, ''))
}

export class Program {
  static program(inputData: ShowSuccessResponse): Program {
    return plainToClass(Program, inputData, {
      excludeExtraneousValues: true
    })
  }
  @Expose() title: string
  @Expose() thumbnailPath: string
  @Expose({ name: 'moviePath' })
  @Transform((value: { pc: string; Android: string; iPhone: string }) => {
    return value.pc
  })
  filePath: string

  @Expose({ name: 'update' })
  @Transform((value: string) => {
    const day = dayjs(value, 'YYYY.M.D').locale('ja')
    if (!day.isValid()) {
      return null
    }
    return day.format('YYYY-MM-DD')
  })
  updateAt?: string

  @Expose({ name: 'personality' })
  @Transform(transformNames)
  personalities: string[]

  @Expose({ name: 'guest' })
  @Transform(transformNames)
  guests: string[]

  @Expose() schedule: string
  @Expose() optionText: string
  @Expose() mail: string
  @Expose() copyright: string
  @Expose({ name: 'url' }) titleAlias: string

  @Expose()
  @Transform((value: string) => {
    if (value === '') {
      return null
    }
    return parseInt(value)
  })
  count?: number

  @Expose({ name: 'link' }) links: Link[]
  @Expose() recommendGoods: Link[]
  @Expose({ name: 'recommendMovie' }) recommendMovies: Link[]
}
