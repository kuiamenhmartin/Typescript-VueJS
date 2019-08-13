import Vue from 'vue'

export async function ErrorNotif (msg: string): Promise<any> {
  Vue.notify({
    group: 'app',
    type: 'error',
    title: 'Error!',
    text: msg
  })
}
