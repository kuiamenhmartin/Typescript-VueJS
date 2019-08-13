import LocalForage from 'localforage'
import { User, LocalSForage } from '@/shared/core/types'

export class LocalPersistentStorage {
  public config: LocalSForage = {
    driver: LocalForage['WEBSQL'],
    name: 'CoinsPHApp',
    version: 1.0,
    size: 4980736,
    storeName: 'userStore',
    description: 'this localForage storage for userStore'
  }

  constructor (sconfig: LocalSForage) {
    this.config = sconfig
    // register config
    LocalForage.config(this.config)
  }

  async register<User> (key: string, value: User): Promise<any> {
    await LocalForage.setItem(key, value).then(function () {
      return LocalForage.getItem(key)
    }).catch(function (err) {
      // we got an error
      console.log(err)
    });
  }

  async removeItem (key: string): Promise<any> {
    return await LocalForage.removeItem(key)
  }

  async isSForageExists (key: string): Promise<any> {
    return await LocalForage.getItem(key)
  }

  async isAuthenticated (key: string): Promise<any> {
    return await this.isSForageExists(key)
  }
}
