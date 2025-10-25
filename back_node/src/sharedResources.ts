export class SharedResources {

  static transformDate(date: Date): string {
    return <string> date?.toISOString().split('T')[0];
  }
}