import { Vue, Component } from 'vue-property-decorator'
import { VForm } from '@/shared/core/types/refs'

@Component
export class FormDataRef extends Vue {
  get form (): VForm {
    return this.$refs.form as VForm
  }
}
