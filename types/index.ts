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
	username: string;
	email: string;
}

export interface MessagesList {
	id: string;
	from: string;
	to: string;
	message: string;
	pageNumber: string;
	cost: number;
	status: "success" | "failed" | "pending";
	createdAt: string;
}
export interface SmsInterface {
	data: MessagesList[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	nextPageUrl: string | null;
	page: number;
	pageSize: number;
	previousPageUrl: string | null;
	total: number;
	totalPages: number;
}

export interface PlansInterface {
	id: string;
	bot_name: number;
	proxy: ProxyInterface | null;
	status: string;
}

export interface PaymentHistoryInterface {
	id: string;
	pack: string;
	status: "En attente" | "Succès" | "Échoué";
}

export interface StatsInterface {
	type: "credit" | "message";
	value: number;
}

export interface BotsInterface {
	id: string;
	bot_name: string;
	token: string;
	swipe_times: number;
	right_swipe_percentage: number;
	status: string;
	user: string;
	proxy: string | null;
}

export interface ProxyInterface {
	id: string;
	name: string;
	host: string;
	password: string;
	username: string;
}

export interface GlobalSettingInterface {
	id: string;
	name: string;
	token: string;
	status: boolean;
}
