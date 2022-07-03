export class Photo {
  id = 0;
  name = "";
  description = "";
  price = 0.25;

  constructor(id: number, name: string, description: string, price?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price || this.price;
  }
}
