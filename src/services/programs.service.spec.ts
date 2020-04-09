import { ProgramsService } from './programs.service'
import { OnsenClient } from '../lib/onsen_client'

describe('Programs', () => {
  describe('fetchPrograms', () => {
    it('returns programs', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'mhr3',
        'stb'
      ])
      const service = new ProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['mhr3', 'stb'])
    })

    it('does not include niconama', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'stb',
        'niconama_stb',
        'stb_niconama'
      ])
      const service = new ProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['stb']);
    })

    it('does not include program end with _ex', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'gashitai',
        '_ex_sample',
        'gashitai_ex'
      ])
      const service = new ProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['gashitai', '_ex_sample']);
    })

    it('does not include program end with -ex', async () => {
      jest.spyOn(OnsenClient.prototype, 'fetchPrograms').mockResolvedValueOnce([
        'gashitai',
        '-ex_sample',
        'gashitai-ex'
      ])
      const service = new ProgramsService()
      const programs = await service.fetchPrograms()
      expect(programs).toEqual(['gashitai', '-ex_sample']);
    })

  })
})
