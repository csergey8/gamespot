<template>
  <div>
    <router-link
     v-if="type == 'link'"
     :to="linkTo"
     :class="['button_default', ...addClass]"
     :style="owStyle"
     >
      <slot />
    </router-link>

    <div
      v-if="type == 'btn'"
      :class="['button_default', ...addClass]"
      :style="owStyle"
    > 
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['linkTo', 'addClass', 'owStyle', 'type']
}
</script>
