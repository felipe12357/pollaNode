export class SharedResources {

  static formatDTOErrors(error:{msg: string, path?: string}[]) {
      return error.map(err => `field ${err.path} ${err.msg}`)
  }
}