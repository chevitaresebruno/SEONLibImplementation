export class TestDTO
{
    private readonly msg: string;
    private readonly error: boolean;
    public static readonly success: TestDTO = new TestDTO("Success", false);

    public constructor(msg: string, error: boolean)
    {
        this.msg = msg;
        this.error = error;
    }

    public wasError(): boolean
    {
        return this.error;
    }

    public getMessage(): string
    {
        return this.msg;
    }
}


interface ITester
{
    run(): TestDTO;
}


export default ITester;

