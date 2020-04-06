export class TrackerError {
    public errorNumber: number;
    public message: string;
    public friendlyMessage: string;

    constructor(
        errorNumber = null,
        message = null,
        friendlyMessage = null
    ) { }
}
