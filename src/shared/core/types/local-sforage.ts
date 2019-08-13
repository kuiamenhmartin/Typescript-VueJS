import LocalForage from 'localforage'

export interface LocalSForage {
  driver?: LocalForage['WEBSQL'], // Force WebSQL; same as using setDriver()
  name?: string,
  version?: number,
  size?: number, // Size of database, in bytes. WebSQL-only for now.
  storeName: string, // Should be alphanumeric, with underscores.
  description?: string
}
