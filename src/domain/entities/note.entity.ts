import generateIdPattern from "../../patterns/libs/generate-id.pattern";



export type NoteType = {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class NoteEntity {
    private constructor(private readonly props: NoteType) {};

    public static build(content: string, userId: string) {
        return new NoteEntity({
            id: generateIdPattern.generate(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public get id() {
        return this.props.id;
    };

    public get content() {
        return this.props.content;
    };
    public get userId() {
        return this.props.userId;
    };
    public get createdAt() {
        return this.props.createdAt;
    };
    public get updatedAt() {
        return this.props.updatedAt;
    };
};