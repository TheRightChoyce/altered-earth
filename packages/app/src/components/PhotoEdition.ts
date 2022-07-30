const originalsSupply = 50;
const editionsPerOriginal = 50;

export class Edition {
  id = 0;
  originalId = 0;

  startId = 0;
  endId = 0;
  nextId = 0;
  minted = 0;
  index = 0;

  constructor(id: number, nextId: number) {
    this.id = id;
    this.originalId = (id - originalsSupply) / editionsPerOriginal;

    this.startId = this.originalId * editionsPerOriginal + originalsSupply;
    this.endId = this.startId + editionsPerOriginal;
    this.nextId = nextId;
    this.minted = nextId - this.startId;
    this.index = (id % editionsPerOriginal) + 1;
  }
}
