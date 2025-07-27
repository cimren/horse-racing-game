import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppButton from '@/components/ui/AppButton.vue'

describe('AppButton', () => {
  it('renders properly', () => {
    const wrapper = mount(AppButton, { props: { label: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })
  it('emits click event when clicked', () => {
    const wrapper = mount(AppButton, { props: { label: 'Click me' } })
    wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
