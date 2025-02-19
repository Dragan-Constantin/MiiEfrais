import fs from 'fs';


class Database {

    private uri: string = process.env.DATA_URI!;
    private isInitialized: boolean = false;

    public init() {
        console.log('Database initialized');
        if (!fs.existsSync(this.uri)) {
            fs.mkdirSync(this.uri, { recursive: true });
        }
        
        this.uri += '/data.json';
        if (!fs.existsSync(this.uri)) {
            fs.writeFileSync(this.uri, JSON.stringify({}));
        }

        const text = fs.readFileSync(this.uri).toString();
        try {
            JSON.parse(text);
        } catch (e) {
            fs.writeFileSync(this.uri, JSON.stringify({ data: {} }));
        }



        this.isInitialized = true;
    }

    private read() {
        if (!this.isInitialized) {
            throw new Error('Database not initialized');
        }

        return JSON.parse(fs.readFileSync(this.uri).toString());
    }

    private write(data: any) {
        if (!this.isInitialized) {
            throw new Error('Database not initialized');
        }

        fs.writeFileSync(this.uri, JSON.stringify(data));
    }

    public insert(collection: string, data: any) {
        const db = this.read();
        if (!db.data[collection]) {
            db.data[collection] = [];
        }

        db.data[collection].push(data);
        
        this.write(db);
    }

    public select(collection: string) {
        const db = this.read();
        return db.data[collection] || [];
    }

    public update(collection: string, data: any) {
        const db = this.read();
        db.data[collection] = data;
        this.write(db);
    }
}

const database = new Database();
export default database;

