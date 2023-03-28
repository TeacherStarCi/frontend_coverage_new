export type DecodedJwtToken =
    {
        address: string,
        iat: number,
        exp: number
    }

export type VerifyToken = {
        token: string,
        address: string
        available : boolean
    }