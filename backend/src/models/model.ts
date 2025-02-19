import { v4 as uuid } from 'uuid';



export class Model {
  public _uuid: string;

    constructor() {
        this._uuid = uuid();
    }
}