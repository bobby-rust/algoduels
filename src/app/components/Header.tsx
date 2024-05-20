import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DynamicAvatar from "./DynamicAvatar";

export default function Header() {
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-[#40418a] to-[#6d00d3] text-white shadow-lg">
			<Link className="flex items-center justify-center" href="#">
				<CodeIcon className="h-6 w-6" />
				<span className="sr-only">algoduels</span>
			</Link>
			<Link className="ml-6 text-sm font-medium hover:underline underline-offset-4" href="#">
				algoduels
			</Link>
			<nav className="ml-auto flex justify-center items-center sm:gap-16 pr-24">
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					How it Works
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					Pricing
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					About
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					Contact
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="overflow-hidden rounded-full" size="icon" variant="outline">
							<Link href="#">
								<DynamicAvatar />
							</Link>
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
			</nav>
		</header>
	);
}

function CodeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="z-10"
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}
