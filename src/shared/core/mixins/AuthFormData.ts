import { Vue, Component } from 'vue-property-decorator'

@Component
export class AuthFormData extends Vue {
  valid: boolean = false;
  e1: boolean = false;
  name: string = '';
  nameRules: any[] = [
    (v: any) => !!v || 'Name is required'
  ];
  email: string = '';
  emailRules: any[] = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ];
  password: string = '';
  passwordRules: any[] = [
    (v: any) => !!v || 'Password is required'
  ];
  confirmPassword: string = '';
  confirmPasswordRules: any[] = [
    (v: string) => !!v || 'Confirm Password is required',
    (v: string) => {
      const vForm = <HTMLFormElement> this.$refs.form
      if (vForm) {
        if (vForm.$el.password.value !== v) {
          return 'Confirm Password did not match'
        }
      }
      return true
    }
  ];
}
