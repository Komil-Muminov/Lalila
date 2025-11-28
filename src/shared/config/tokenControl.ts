const ACCESS_TOKEN_KEY = "lalila/REFRESH_TOKEN_KEY";
const REFRESH_TOKEN_KEY = "lalila/REFRESH_TOKEN_KEY";
interface IToken {
	accessToken: string;
	refetchToken: string;
	// expireTime: number;
}

export const tokenControl = {
	set: ({ accessToken, refetchToken }: IToken) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, refetchToken);
	},
	get: () => {
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	},
};
