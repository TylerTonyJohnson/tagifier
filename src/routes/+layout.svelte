<script>
	import favicon from '#lib/assets/favicon.svg';
	// import pico css
	import '@picocss/pico/css/pico.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
