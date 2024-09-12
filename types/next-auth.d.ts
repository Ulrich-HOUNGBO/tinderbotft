import { OfficeType, UsersRolesInterface } from "@/types";

declare module "next-auth/jwt" {
	interface JWT {
		access: string;
	}
}
declare module "next-auth" {
	interface Session {
		accessToken: string;
	}
}
