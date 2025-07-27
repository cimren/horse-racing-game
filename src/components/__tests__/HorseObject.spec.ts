/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import HorseObject from '@/components/game/HorseObject.vue'
import { GameStates } from '@/utils/constants'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '@/stores/game'
import type { GameState } from '@/utils/interfaces'

vi.mock('@/components/icons/IconHorse.vue', () => ({
  default: { template: '<div />' },
}))

const horse = {
  id: 1,
  name: 'Thunder',
  color: 'brown',
  condition: 80,
}

const distance = 100

function setGameState(state: GameState) {
  const store = useGameStore()
  store.gameState = state
}

describe('HorseObject.vue', () => {
  let wrapper: VueWrapper<any>
  let rafSpy: any
  let cafSpy: any

  beforeEach(() => {
    setActivePinia(createPinia())
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(cb, 0)
      return 1
    })
    cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    wrapper = mount(HorseObject, {
      props: { horse, distance },
      global: {
        stubs: { IconHorse: true },
      },
    })
  })

  afterEach(() => {
    rafSpy.mockRestore()
    cafSpy.mockRestore()
    wrapper.unmount()
  })

  it('renders horse with correct color', () => {
    expect(wrapper.findComponent({ name: 'IconHorse' }).exists()).toBe(true)
    expect(wrapper.props('horse').color).toBe('brown')
  })

  it('starts animation when gameState is RACE_STARTED', async () => {
    setGameState(GameStates.RACE_STARTED)
    await wrapper.vm.$nextTick()
    expect(rafSpy).toHaveBeenCalled()
  })

  it('stops animation when gameState is RACE_PAUSED', async () => {
    setGameState(GameStates.RACE_STARTED)
    await wrapper.vm.$nextTick()
    setGameState(GameStates.RACE_PAUSED)
    await wrapper.vm.$nextTick()
    expect(cafSpy).toHaveBeenCalled()
  })

  it('resets position when gameState is ROUND_FINISHED', async () => {
    setGameState(GameStates.RACE_STARTED)
    await wrapper.vm.$nextTick()
    wrapper.vm.position = 50
    setGameState(GameStates.ROUND_FINISHED)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.position).toBe(0)
  })

  it('emits onRaceFinish when horse reaches finish', async () => {
    setGameState(GameStates.RACE_STARTED)
    await wrapper.vm.$nextTick()
    wrapper.vm.position = distance - 1
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(wrapper.emitted('onRaceFinish')).toBeTruthy()
    expect(wrapper.vm.position).toBe(distance)
  })

  it('does not emit onRaceFinish multiple times', async () => {
    setGameState(GameStates.RACE_STARTED)
    await wrapper.vm.$nextTick()
    wrapper.vm.position = distance
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(wrapper.emitted('onRaceFinish')?.length).toBe(1)
  })
})
