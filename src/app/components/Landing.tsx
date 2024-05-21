/**
 * @file Landing page component for the application. This component renders the landing page with sections
 *       including an introduction, matchmaking algorithm details, user testimonials, and a call to action for signing up.
 */

import React from "react";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DynamicAvatar from "./DynamicAvatar";

/**
 * Landing page component.
 *
 * @returns {JSX.Element} The landing page component.
 */
export default function Landing(): JSX.Element {
	return (
		<div className="flex flex-col min-h-[100dvh]">
			<main className="flex-1">
				{/* Hero section */}
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#40418a] to-[#6d00d3] text-white">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
										Compete in real-time coding duels to ace your interviews
									</h1>
									<p className="max-w-[600px] text-gray-200 md:text-xl">
										Add a new twist to your interview preparation with an engaging and competitive atmosphere.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										className="inline-flex h-10 items-center justify-center rounded-md bg-white text-[#6366F1] px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
										href="#"
									>
										Sign Up
									</Link>
									<Link
										className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent text-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
										href="#"
									>
										Learn More
									</Link>
								</div>
							</div>
							<Image src="/computer-cat.png" width={550} height={550} alt="worker using computer" />
						</div>
					</div>
				</section>

				{/* Matchmaking algorithm section */}
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-[#6366F1]">
									Matchmaking Algorithm
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unparalleled Precision</h2>
								<p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
									Our proprietary algorithm analyzes your gameplay data, skill level, and strategic preferences to pair
									you with the perfect opponents, ensuring thrilling and evenly matched competitions.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
							<Image src="/vortex.png" width={400} height={500} alt="vortex" className="transform rotate-12" />
							<div className="flex flex-col justify-center space-y-4">
								<ul className="grid gap-6">
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold">Personalized Matches</h3>
											<p className="text-gray-800 dark:text-gray-400 text-lg">
												Our algorithm considers your unique playstyle and skill level to find the perfect opponents for
												you.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold">Continuous Improvement</h3>
											<p className="text-gray-800 dark:text-gray-400 text-lg">
												With each match, the algorithm refines its understanding of your abilities, ensuring you're
												always challenged.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold">Competitive Edge</h3>
											<p className="text-gray-800 dark:text-gray-400 text-lg">
												Elevate your strategic skills and gain a competitive edge over your opponents.
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* User testimonials section */}
				<section className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hear From Our Users</h2>
							<p className="mx-auto max-w-[600px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Our algorithm has helped players of all skill levels improve their game and achieve new heights of
								success.
							</p>
						</div>
						<div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 h-60">
							{/* Testimonial card */}
							<Card className="h-full bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white flex items-center">
								<CardContent className="flex flex-col">
									<div className="space-y-2">
										<div className="inline-block rounded-lg bg-white/20 px-3 py-1 my-2 text-sm">Testimonial</div>
									</div>
									<div className="flex flex-col items-center space-x-3">
										<blockquote className="text-lg italic tracking-tigher leading-snug">
											"A fantastic way to prepare for coding interviews! Competing with others in real-time has
											sharpened my problem-solving skills and kept me engaged. The app is intuitive and makes leveling
											up addictive."
										</blockquote>
										<div className="flex justify-center align-center">
											<DynamicAvatar />
											<div className="flex flex-col justify-center align-bottom">
												<div className="font-medium">John Doe</div>
												<div className="text-sm text-gray-200">Stanford University</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="h-full bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white flex items-center justify-center">
								<CardContent className="flex flex-col justify-between">
									<div className="space-y-2">
										<div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm">Testimonial</div>
										<p className="text-lg italic tracking-tighter leading-snug">
											"This app brings a whole new dimension to solving LeetCode problems. The competitive matchmaking
											is genius, pushing me to improve with every match. It's both fun and educational!"
										</p>
									</div>
									<div className="flex items-center space-x-3">
										<DynamicAvatar />
										<div>
											<div className="font-medium">Sarah Anderson</div>
											<div className="text-sm text-gray-200">Software Engineer at Tech Startup</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="h-full bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white flex items-center justify-center">
								<CardContent className="flex flex-col justify-between">
									<div className="space-y-2">
										<div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm">Testimonial</div>
										<p className="text-lg italic tracking-tighter leading-snug">
											"Finally, an app that makes coding challenges fun and competitive. The matchmaking system is
											smooth, and leveling up feels incredibly rewarding. Highly recommend for anyone serious about
											improving their coding abilities."
										</p>
									</div>
									<div className="flex items-center space-x-3">
										<DynamicAvatar />
										<div>
											<div className="font-medium">Sarah K.</div>
											<div className="text-sm text-gray-200">Student</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Call to action section */}
				<section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Take Your Competitive Edge to the Next Level
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Sign up now and play for free or level up your game with premium.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex space-x-2">
								<Input
									className="max-w-lg flex-1 rounded-md bg-white text-[#6366F1] placeholder:text-[#6366F1]"
									placeholder="Enter your email"
									type="email"
								/>
								<Button className="rounded-md bg-white text-[#6366F1]" type="submit">
									Sign Up
								</Button>
							</form>
							<p className="text-xs text-gray-200">
								Sign up to get started.
								<Link className="underline underline-offset-2" href="#">
									Terms & Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white">
				<p className="text-xs">© 2024 algoduels. All rights reserved.</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</Link>
				</nav>
				<a href="https://www.vectorstock.com/royalty-free-vector/cat-with-computer-and-coffee-cartoon-vector-47467199">
					Vector image by VectorStock / catalyststuff
				</a>
			</footer>
		</div>
	);
}
