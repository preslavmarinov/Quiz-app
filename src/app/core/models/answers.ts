export class Answers {
    private correct:number;
    private total:number;

    constructor(correct:number, total:number) {
        this.correct = correct;
        this.total = total;
    }

    getCorrect(): number {
        return this.correct
    }

    setCorrect(value:number): void {
        this.correct =  value
    }
    incrementCorrect() : void {
        this.correct += 1;
    }

    getTotal(): number {
        return this.total
    }

    setTotal(value:number): void {
        this.total = value;
    }
}