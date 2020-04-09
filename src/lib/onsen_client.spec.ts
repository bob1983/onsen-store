import axios from 'axios'
import { OnsenClient } from "./onsen_client"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('OnsenClient', () => {
  describe('fetchProgramList', () => {
    test('returns program names', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: ['mhr3', 'koitate'] } })
      const client = OnsenClient.client()
      await expect(client.fetchPrograms()).resolves.toEqual(['mhr3', 'koitate'])
    })
    test('throws error when it fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Error message'))
      const client = OnsenClient.client()
      await expect(client.fetchPrograms()).rejects.toThrow('Error message')
    })
  })

  describe('fetchProgram', () => {
    test('returns program', async () => {
      mockedAxios.get.mockResolvedValue({
        data: `callback({"type":"sound","thumbnailPath":"\/program\/yagakimi\/image\/619_pgi01_m.jpg","moviePath":{"pc":"https:\/\/onsen-dl.sslcs.cdngc.net\/radio\/yagakimi190418F5Kg.mp3","iPhone":"https:\/\/onsen-dl.sslcs.cdngc.net\/radio\/yagakimi190418F5Kg.mp3","Android":"https:\/\/onsen-dl.sslcs.cdngc.net\/radio\/yagakimi190418F5Kg.mp3"},"title":"やがて君になる～私、このラジオ好きになりそう～","personality":"高田憂希（小糸侑 役） \/ 寿美菜子（七海燈子 役）","guest":"","update":"2019.4.18","count":"12","schedule":"月1回木曜配信","optionText":"やがて君になる製作委員会","mail":"yagakimi@onsen.ag","copyright":"©2018 仲谷 鳰／ＫＡＤＯＫＡＷＡ／やがて君になる製作委員会","url":"yagakimi","link":[{"imagePath":"\/program\/yagakimi\/image\/619_pgl01.jpg","url":"http:\/\/yagakimi.com\/"}],"recommendGoods":[],"recommendMovie":[],"cm":[],"allowExpand":"true"});
`
      })

      const client = OnsenClient.client()
      const expected = {
        thumbnailPath: '/program/yagakimi/image/619_pgi01_m.jpg',
        filePath: 'https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3',
        title: 'やがて君になる～私、このラジオ好きになりそう～',
        personalities: ['高田憂希（小糸侑 役）','寿美菜子（七海燈子 役）'],
        guests: [],
        updateAt: '2019-04-18',
        titleAlias: 'yagakimi',
        count: 12,
        schedule: '月1回木曜配信',
        mail: 'yagakimi@onsen.ag',
        optionText: 'やがて君になる製作委員会',
        copyright: '©2018 仲谷 鳰／ＫＡＤＯＫＡＷＡ／やがて君になる製作委員会',
        links: [
          {
            imagePath: '/program/yagakimi/image/619_pgl01.jpg',
            url: 'http://yagakimi.com/',
          },
        ],
        recommendGoods: [],
        recommendMovies: []
      }
      return expect(client.fetchProgram('yagakimi')).resolves.toEqual(expected)
    })

    test('throws not found error if program does not exist', () => {
      mockedAxios.get.mockResolvedValue({
        data: `callback({"error":"not found."});
`
      })
      const client = OnsenClient.client()
      return expect(client.fetchProgram('not_exist_program')).rejects.toEqual(
        new Error('Program not_exist_program not found')
      )
    })
  })
})
