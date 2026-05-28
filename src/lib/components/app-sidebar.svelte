<script lang="ts">
	// UI Components
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	const sidebar = useSidebar();

	// Icons
	import Home from 'svelte-material-icons/Home.svelte';
	import Code from 'svelte-material-icons/CodeTags.svelte';
	import User from 'svelte-material-icons/Account.svelte';
	import Github from 'svelte-material-icons/Github.svelte';
	import Mail from 'svelte-material-icons/Email.svelte';
	import Shop from 'svelte-material-icons/Basket.svelte';

	// Types
	import type { ComponentProps } from 'svelte';

	interface NavigationItem {
		title: string;
		url: string;
		icon: any; // Replace with proper icon component type
		children: NavigationItem[];
	}

	interface SocialLink {
		icon: any;
		href: string;
		label: string;
	}

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	// Navigation Configuration
	const navigation: NavigationItem[] = [
		{ title: 'Home', url: '/', children: [], icon: Home },
		{ title: 'Projects', url: '/projects', children: [], icon: Code },
		{ title: 'About me', url: '/about', children: [], icon: User }
	];

	const socialLinks: SocialLink[] = [
		{ icon: Github, href: 'https://github.com/Inglan', label: 'GitHub' },
		{ icon: Mail, href: 'mailto:me@ingo.au', label: 'Email' }
	];
</script>

<Sidebar.Root {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={() => {
						sidebar.setOpenMobile(false);
					}}
					size="lg"
				>
					{#snippet child({ props })}
						<a href="/" {...props}>
							<enhanced:img
								src="$lib/images/pfp/circle.png"
								class="aspect-square size-8"
								alt="Ingo Logo"
							/>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Ingo Wolf</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Separator />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each navigation as item}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={item.url === page.url.pathname}
							onclick={() => {
								sidebar.setOpenMobile(false);
							}}
							size="lg"
						>
							{#snippet child({ props })}
								<a href={item.url} {...props}>
									<item.icon />
									{item.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Group>
			<Sidebar.Menu class="gap-3">
				<Sidebar.MenuItem class="flex flex-row justify-center gap-3">
					{#each socialLinks as { icon: Icon, href, label }}
						<Button size="icon" variant="secondary" {href}>
							<Icon />
							<span class="sr-only">{label}</span>
						</Button>
					{/each}
				</Sidebar.MenuItem>
				<Sidebar.MenuItem class="text-center">Made with ♥️ in Svelte</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Footer>
</Sidebar.Root>
