
export interface IValidatePayload {
	// userId: string
	roleId: string
	sessionId: string
	iat: number
	exp: number
	aud: string
	iss: string
	sub: string
}
