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
		credit: number;
	};
}

export interface SmsInterface {
	id: string;
	from: string;
	to: string;
	message: string;
	pageNumber: string;
	cost: number;
	status: "success" | "failed" | "pending";
	createdAt: string;
}

export interface PlansInterface {
	id: string;
	price: number;
	credit: string;
	recommended: boolean;
	status: "active" | "inactive";
}

export interface PaymentHistoryInterface {
	id: string;
	pack: string;
	status: "En attente" | "Succès" | "Échoué";
}
