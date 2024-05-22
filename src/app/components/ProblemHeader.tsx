import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link, CodeIcon } from "lucide-react";
import React from "react";
import DynamicAvatar from "./DynamicAvatar";

export default function ProblemHeader(props: any) {
	return (
		<header className="flex items-center gap-4 border-b w-full">
			<Link className="lg:hidden" href="#">
				<CodeIcon className="h-6 w-6" />
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="rounded-full border border-gray-200h w-12 h-12 dark:border-gray-800 m-3 ml-auto "
						size="icon"
						variant="ghost"
					>
						<DynamicAvatar />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
