import fs from 'fs';


class Database {

    private uri: string;

    constructor() {
        console.log('Database initialized');

        this.uri = process.env.DATA_URI!;
        if (!fs.existsSync(this.uri)) {
            fs.mkdirSync(this.uri, { recursive: true });
        }
        
        this.uri += '/data.json';
        if (!fs.existsSync(this.uri)) {
            fs.writeFileSync(this.uri, JSON.stringify({
                collections: [],
                data: {}
            }));
        }
    }

}

const database = new Database();
export default database;

