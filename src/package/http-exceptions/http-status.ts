


export type HttpStatus = 200 | 201 | 204 | 400 | 401 | 404 | 409;


export const HttpStatus = {
    OK: 200 as HttpStatus,
    CREATED: 201 as HttpStatus,
    NOT_CONTENT: 204 as HttpStatus,
    BAD_REQUEST: 400 as HttpStatus,
    NOT_FOUND: 404 as HttpStatus,
    CONFLICT: 409 as HttpStatus,
} as const;