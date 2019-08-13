import { Vue, Component } from 'vue-property-decorator'

@Component
export class ConfigFormData extends Vue {
  valid: boolean = false;
  configRules: any[] = [
    (v: any) => !!v || 'This field is required'
  ];
}
