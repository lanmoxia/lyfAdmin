<template>
  <slot v-if="hasAuth"></slot>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Auth',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const hasAuth = computed(() => {
      const hasAuths = store.getters.buttons.map(button => button.url)
      return props.value.some(button => hasAuths.includes(button))
    })

    return {
      hasAuth
    }
  }
}
</script>