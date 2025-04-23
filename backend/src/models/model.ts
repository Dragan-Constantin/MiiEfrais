import { v4 as generate } from 'uuid';



export class Model {
  public _uuid: string;

    constructor(uuid?: string) {
        this._uuid = uuid || generate();
    }
}