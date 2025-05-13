



export interface Mapper<TO, FROM> {
    toDto(input: TO): FROM;
    toEntity(input: FROM): TO;
};