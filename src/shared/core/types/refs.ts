import Vue from 'vue'

export type VForm = Vue & {
  input: HTMLInputElement,
  form: HTMLFormElement,
  validate: () => boolean,
  reset: () => object
}
