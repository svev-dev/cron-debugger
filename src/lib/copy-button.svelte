<script lang="ts">
    import type { Component } from 'svelte';
    import CopyIcon from './icons/copy-icon.svelte';
    interface Props {
        value: () => string;
        text?: string;
        successText?: string;
        Icon?: Component;
    }
    let { value, text, successText, Icon }: Props = $props();
    let didCopy = $state(false);

    const onclick = async () => {
        await navigator.clipboard.writeText(value());
        didCopy = true;
        setTimeout(() => {
            didCopy = false;
        }, 1500);
    };
</script>

<button {onclick} aria-label="Copy">
    {#if Icon}
        <Icon />
    {:else}
        <CopyIcon />
    {/if}
    {#if didCopy}
        {successText || 'Copied!'}
    {:else}
        {text || 'Copy'}
    {/if}
</button>

<style>
    button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        border-radius: 0.25rem;
        background-color: #f1f5f9;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        font-size: 0.875rem;
        border-width: 1px;
        transition: background-color 0.2s;
        cursor: pointer;
    }
    button:hover {
        background-color: #e2e8f0;
    }
</style>
