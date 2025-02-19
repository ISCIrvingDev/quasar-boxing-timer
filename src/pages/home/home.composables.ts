import { LocalStorage } from 'quasar'
import { onMounted, ref } from 'vue'
import type { HomeModel } from './home.models'

/*
 * Variables
 */
const homeModel = ref<HomeModel>({} as HomeModel)

/*
 * Variables reactivas
 */
export function useInit() {
  onMounted(() => {
    // LocalStorage.set('homeModel', {} as HomeModel)

    const storedData: HomeModel =
      LocalStorage.getItem<HomeModel>('homeModel') ||
      ({
        numRounds: 0,
        lengthRound: '00:00',
        noticeRound: '10s',
        lengthBreak: '00:00',
        noticeBreak: '10s',
        totalTime: '00:00:00',
      } as HomeModel)

    homeModel.value.numRounds = storedData.numRounds
    homeModel.value.lengthRound = storedData.lengthRound
    homeModel.value.noticeRound = storedData.noticeRound
    homeModel.value.lengthBreak = storedData.lengthBreak
    homeModel.value.noticeBreak = storedData.noticeBreak
    homeModel.value.totalTime = storedData.totalTime
  })

  return {
    homeModel,
  }
}
