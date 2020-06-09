export default class ElCounter {
    constructor() {
        this.counter = 0;
    }

    get next() {
        this.counter += 1
        return this.counter.toString();
    }
}