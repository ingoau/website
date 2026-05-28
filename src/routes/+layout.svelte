<script lang="ts">
	// Svelte Kit imports
	import { page } from '$app/state';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';

	// Style imports
	import '../app.css';
	import '$lib/assets/stylesheets/prism-holi-theme.css';
	import '@fontsource/inter';

	// UI Components
	import { Button } from '$lib/components/ui/button/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Cursor from '$lib/components/cursor.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';

	// Icons
	import Home from 'svelte-material-icons/Home.svelte';

	// Transitions
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	const transitionIn = { delay: 300, duration: 300, y: 20, easing: cubicOut };
	const transitionOut = { duration: 300, y: -20, easing: cubicIn };

	// Scroll handling after navigation
	afterNavigate(() => {
		disableScrollHandling();
		setTimeout(() => {
			scrollTo(0, 0);
		}, 300);
	});

	let { children } = $props();
</script>

<Sidebar.Provider style="--sidebar-width: 19rem;" open={page.url.pathname == '/' ? false : true}>
	<!-- Sidebar Component -->
	<AppSidebar />

	<Sidebar.Inset>
		{#key page.url.pathname}
			<main tabindex="-1" in:fly|global={transitionIn} out:fly|global={transitionOut}>
				{@render children()}
			</main>
		{/key}
		<!-- Sidebar Trigger Button -->
		<div
			class="fixed bottom-2 z-50 flex translate-x-2 flex-row gap-2 duration-300 [&>div>*]:p-6 [&>div>*]:backdrop-blur-2xl"
		>
			<div>
				<Sidebar.Trigger id="sidebar-trigger" />
			</div>
			{#if page.url.pathname != '/'}
				<div in:fly|global={transitionIn} out:fly|global={transitionOut}>
					<Button type="button" variant="ghost" size="icon" href="/">
						<Home />
					</Button>
				</div>
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<ModeWatcher />
<Toaster />
<Cursor />

<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
	}
</style>
