import { OnsenProgramsService, ProgramNotFoundError } from './onsen_programs.service'
import { OnsenClient } from '../lib/onsen_client'

describe('OnsenProgramsService', () => {
  describe('fetchPrograms', () => {
    it('returns programs', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'mhr3',
        'stb'
      ])
      const service = new OnsenProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['mhr3', 'stb'])
    })

    it('does not include niconama', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'stb',
        'niconama_stb',
        'stb_niconama'
      ])
      const service = new OnsenProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['stb']);
    })

    it('does not include program end with _ex', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'gashitai',
        '_ex_sample',
        'gashitai_ex'
      ])
      const service = new OnsenProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['gashitai', '_ex_sample']);
    })

    it('does not include program end with -ex', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'gashitai',
        '-ex_sample',
        'gashitai-ex'
      ])
      const service = new OnsenProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['gashitai', '-ex_sample']);
    })
  })

  describe('fetchProgram', () => {
    it('returns a program', async () => {
      const expected = {
        thumbnailPath: "/program/yagakimi/image/619_pgi01_m.jpg",
        filePath:
          "https://onsen-dl.sslcs.cdngc.net/radio/yagakimi190418F5Kg.mp3",
        title: "やがて君になる～私、このラジオ好きになりそう～",
        personalities: ["高田憂希（小糸侑 役）", "寿美菜子（七海燈子 役）"],
        guests: [],
        updateAt: "2019-04-18",
        titleAlias: "yagakimi",
        count: 12,
        schedule: "月1回木曜配信",
        mail: "yagakimi@onsen.ag",
        optionText: "やがて君になる製作委員会",
        copyright: "©2018 仲谷 鳰／ＫＡＤＯＫＡＷＡ／やがて君になる製作委員会",
        links: [
          {
            imagePath: "/program/yagakimi/image/619_pgl01.jpg",
            url: "http://yagakimi.com/",
          },
        ],
        recommendGoods: [],
        recommendMovies: [],
      };
      jest.spyOn(OnsenClient.prototype, 'fetchProgram').mockResolvedValueOnce(expected)
      const service = new OnsenProgramsService()
      expect(await service.fetchProgram('yagakimi')).toEqual(expected)
    })

    it('returns a error if given program title does not exist', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchProgram').mockRejectedValueOnce(new Error('error'))
      const service = new OnsenProgramsService()
      await expect(service.fetchProgram('not_exist'))
        .rejects.toThrow(new ProgramNotFoundError('Program: not_exist not found'))
    })
  })
})
