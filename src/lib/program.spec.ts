import 'reflect-metadata'
import { Program } from './program'

describe('Program', () => {
  let inputData

  beforeEach(() => {
    inputData = {
      type: 'sound',
      thumbnailPath: '/program/yagakimi/image/619_pgi01_m.jpg',
      moviePath: {
        pc: 'https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3',
        iPhone: 'https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3',
        Android:
          'https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3',
      },
      title: 'やがて君になる～私、このラジオ好きになりそう～',
      personality: '高田憂希（小糸侑 役） / 寿美菜子（七海燈子 役）',
      guest: '',
      update: '2019.4.18',
      count: '12',
      schedule: '月1回木曜配信',
      optionText: 'やがて君になる製作委員会',
      mail: 'yagakimi@onsen.ag',
      copyright: '©2018 仲谷 鳰／ＫＡＤＯＫＡＷＡ／やがて君になる製作委員会',
      url: 'yagakimi',
      link: [
        {
          imagePath: '/program/yagakimi/image/619_pgl01.jpg',
          url: 'http://yagakimi.com/',
        },
      ],
      recommendGoods: [],
      recommendMovie: [
        {
          imagePath: '/program/yagakimi/image/619_pgl01.jpg',
          url: 'http://yagakimi.com/',
        },
      ],
      cm: [],
      allowExpand: 'true',
    }
  })

  describe('program()', () => {
    test('transforms object to program', () => {
      const program = Program.program(inputData)

      expect(program).toEqual({
        title: 'やがて君になる～私、このラジオ好きになりそう～',
        thumbnailPath: '/program/yagakimi/image/619_pgi01_m.jpg',
        filePath: 'https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3',
        updateAt: '2019-04-18',
        personalities: ['高田憂希（小糸侑 役）', '寿美菜子（七海燈子 役）'],
        guests: [],
        schedule: '月1回木曜配信',
        optionText: 'やがて君になる製作委員会',
        mail: 'yagakimi@onsen.ag',
        copyright: '©2018 仲谷 鳰／ＫＡＤＯＫＡＷＡ／やがて君になる製作委員会',
        titleAlias: 'yagakimi',
        count: 12,
        links: [
          {
            imagePath: '/program/yagakimi/image/619_pgl01.jpg',
            url: 'http://yagakimi.com/',
          },
        ],
        recommendGoods: [],
        recommendMovies: [
          {
            imagePath: '/program/yagakimi/image/619_pgl01.jpg',
            url: 'http://yagakimi.com/',
          },
        ],
      })
    })

    test('returns null as count if count is empty string', () => {
      inputData.count = ''
      const program = Program.program(inputData)
      expect(program.count).toBeNull()
    })

    test('returns null as updateAt if update is empty string', () => {
      inputData.update = ''
      const program = Program.program(inputData)
      expect(program.updateAt).toBeNull()
    })
  })
})
