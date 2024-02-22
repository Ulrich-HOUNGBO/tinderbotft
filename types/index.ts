export interface NavItem {
	title: string;
	href: string;
	icon?: any;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	description?: string;
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface UserInterface {
	id: string;
	user: {
		id: string;
		username: string;
		phoneNo: string;
		email: string;
		role: "user" | "admin";
		phoneNumber: string;
		creditsNumber: number;
	};
}
