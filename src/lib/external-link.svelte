<script lang="ts">
    import ExternalLinkIcon from './icons/external-link-icon.svelte';

    interface Props {
        href: string;
        text: string;
        trusted: boolean;
    }
    let { href, text, trusted }: Props = $props();
</script>

<a {href} target="_blank" class="external-link" {...trusted ? {} : { rel: 'noopener noreferrer' }}>
    <span class="link-text">{text}</span>
    <ExternalLinkIcon />
</a>

<style>
    .external-link {
        color: #2563eb; /* blue-600 */
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        transition: color 0.2s;
    }

    .external-link:hover {
        color: #1e40af; /* blue-800 */
    }

    .link-text {
        margin-right: 0.25rem;
    }
</style>
