import posthog from 'posthog-js';
import { browser } from '$app/environment';
export const prerender = true;

export const load = async () => {
	if (browser) {
		posthog.init('phc_1rTfejgP2wgjE7B769DxyoAaxsd2G5buNRHM9G1F2hK', {
			api_host: 'https://us.i.posthog.com'
		});
	}
	return;
};
