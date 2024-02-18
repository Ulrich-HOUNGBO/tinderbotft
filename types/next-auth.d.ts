import { OfficeType, UsersRolesInterface } from "@/types";

declare module "next-auth/jwt" {
	interface JWT {
		token: string;
	}
}
declare module "next-auth" {
	interface Session {
		accessToken: string;
	}
}
