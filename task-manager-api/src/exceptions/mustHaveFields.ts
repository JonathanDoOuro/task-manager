export class MustHaveAllFields extends Error {
    constructor(message: string) {
        super(message);
    }
}