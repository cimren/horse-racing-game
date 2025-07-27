import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTable from '@/components/ui/AppTable.vue'

const columns = [
  { columnName: 'name', label: 'Name' },
  { columnName: 'condition', label: 'Condition' },
  { columnName: 'color', label: 'Color' },
]
const rows = [
  { id: 1, name: 'Thunderbolt', condition: 45, color: 'red' },
  { id: 2, name: 'Lightning', condition: 50, color: 'yellow' },
]

describe('AppTable', () => {
  it('renders the table title', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows, title: 'Horse List' },
    })
    expect(wrapper.find('h2').text()).toBe('Horse List')
  })

  it('renders default title if not provided', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows },
    })
    expect(wrapper.find('h2').text()).toBe('Table')
  })

  it('renders table headers', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows },
    })
    const ths = wrapper.findAll('th')
    expect(ths).toHaveLength(columns.length)
    expect(ths[0].text()).toBe('Name')
    expect(ths[1].text()).toBe('Condition')
    expect(ths[2].text()).toBe('Color')
  })

  it('renders table rows and cells', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows },
    })
    const trs = wrapper.findAll('tbody tr')
    expect(trs).toHaveLength(rows.length)
    expect(trs[0].findAll('td')[0].text()).toBe('Thunderbolt')
    expect(trs[0].findAll('td')[1].text()).toBe('45')
    expect(trs[0].findAll('td')[2].text()).toBe('red')
    expect(trs[1].findAll('td')[0].text()).toBe('Lightning')
    expect(trs[1].findAll('td')[1].text()).toBe('50')
    expect(trs[1].findAll('td')[2].text()).toBe('yellow')
  })

  it('does not render table if rows are empty', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows: [] },
    })
    expect(wrapper.find('table').isVisible()).toBe(false)
  })

  it('applies small class when size is Small', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows, size: 'Small' },
    })
    expect(wrapper.find('.app-table').classes()).toContain('small')
  })

  it('does not apply small class when size is Default', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows, size: 'Default' },
    })
    expect(wrapper.find('.app-table').classes()).not.toContain('small')
  })
})
