import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Web-based Kanban style list creation application with SvelteJS'
	}
});

export default app;