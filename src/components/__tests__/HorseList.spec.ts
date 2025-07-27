import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/layout/HorseList.vue'
import AppTable from '@/components/ui/AppTable.vue'
import { horseData } from '@/utils/constants'

describe('HorseList.vue', () => {
  it('renders the component root element', () => {
    const wrapper = mount(HorseList)
    expect(wrapper.classes()).toContain('horse-list')
  })

  it('renders AppTable component', () => {
    const wrapper = mount(HorseList)
    const appTable = wrapper.findComponent(AppTable)
    expect(appTable.exists()).toBe(true)
  })

  it('passes correct props to AppTable', () => {
    const wrapper = mount(HorseList)
    const appTable = wrapper.findComponent(AppTable)
    expect(appTable.props('title')).toBe(`Horse List 1 - ${horseData.length}`)
    expect(appTable.props('columns')).toEqual([
      { columnName: 'name', label: 'Name' },
      { columnName: 'condition', label: 'Condition' },
      { columnName: 'color', label: 'Color' },
    ])
    expect(appTable.props('rows')).toBe(horseData)
  })

  it('renders the correct title in AppTable', () => {
    const wrapper = mount(HorseList)
    const appTable = wrapper.findComponent(AppTable)
    expect(appTable.props('title')).toContain('Horse List 1')
    expect(appTable.props('title')).toContain(horseData.length.toString())
  })
})
