export class Sleep {
  id: number;
  sleepLocationTemp: number;
  startSleepTime: Date;
  endSleepTime: Date;
  wakingRestfulness: number;

  constructer(id?: number, sleepLocationTemp?: number, startSleepTime?: Date, endSleepTime?: Date, wakingRestfulness?: number ) {
    this.id = id;
    this.sleepLocationTemp = sleepLocationTemp;
    this.startSleepTime = startSleepTime;
    this.endSleepTime = endSleepTime;
    this.wakingRestfulness = wakingRestfulness;
  }
}
