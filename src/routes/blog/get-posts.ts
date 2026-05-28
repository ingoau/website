export async function getPosts() {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('./**/*.md')).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: {
					title: string;
					description: string;
					image: string;
					posted: number;
					updated: number;
					tags: string[];
				};
			};
			const slug = '/blog/' + (path as string).split('/')[1];
			return { ...metadata, slug };
		})
	);

	let sortedPosts = posts.sort((a, b) => b.posted - a.posted);

	let finalPosts = sortedPosts.map((post) => ({
		title: post.title,
		image: post.image,
		description: post.description,
		tags: post.tags,
		slug: post.slug
	}));

	return finalPosts;
}
