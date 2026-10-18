<script>
	import nlp from 'compromise';
	import customTags from '#lib/extensions/tags.json';
	import { getMostSpecificTags } from '#lib/nlp/tags.js';

	const customTagKeys = Object.keys(customTags.tags);

	// Extend NLP
	nlp.extend(customTags);

	// Processing chain

	// Input
	let text = $state('Side Cabinet');

	// NLP Doc
	let doc = $derived(nlp(text));

	// Get tags from the doc
	let tags = $derived(doc.out('tags'));

	// Flatten tags
	let flatTags = $derived(tags.flatMap((sentence) => Object.values(sentence).flat()));

	// Get only the tags that are in our custom tags list
	let desiredTags = $derived(flatTags.filter((tag) => customTagKeys.includes(tag)));

	// Get the most specific tags (i.e., the ones that are not parents of other tags)
	let mostSpecificTags = $derived(getMostSpecificTags(desiredTags, customTags.tags));

	// $inspect(tags);
	// $inspect(mostSpecificTags);

	// Array of most-specific tags found in the text
	// let foundTags = $derived(customTagKeys.filter((tag) => doc.has(`#${tag}`)));

	let foundTags = $derived(mostSpecificTags);
</script>

<!-- Title -->
<h1>Tagifier</h1>

<!-- Input -->
<textarea bind:value={text}></textarea>

<!-- Output -->
<!-- <div>{JSON.stringify(output)}</div> -->

<div class="tags">
	{#each foundTags as tag}
		<div class="tag">{customTags.tags[tag]?.label ?? tag}</div>
	{/each}
</div>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		padding: 0.35rem 0.75rem;
		background: #2563eb;
		color: white;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
	}
</style>
