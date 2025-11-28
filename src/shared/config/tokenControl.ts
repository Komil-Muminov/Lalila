const ACCESS_TOKEN = "lalila/accessToken";
const REFETCH_TOKEN = "lalila/refetchToken";
const ROLE = "lalila/role";
interface IToken {
	accessToken: string;
	refetchToken: string;
}

interface IRole {
	roleId: string;
}
export const tokenControl = {
	set: ({ accessToken, refetchToken }: IToken) => {
		localStorage.setItem(ACCESS_TOKEN, accessToken);
		localStorage.setItem(REFETCH_TOKEN, refetchToken);
	},
	get: () => {
		return localStorage.getItem(ACCESS_TOKEN);
	},
	remove: () => {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFETCH_TOKEN);
	},
	setRole: ({ roleId }: IRole) => {
		localStorage.setItem(ROLE, roleId);
	},
	getRole: () => {
		return localStorage.getItem(ROLE);
	},
};
