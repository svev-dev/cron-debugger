<script lang="ts">
    import type { Component, Snippet } from 'svelte';

    interface Props {
        title: string;
        Icon?: Component;
        actions?: Snippet[];
        children: Snippet;
    }

    const { title, Icon, actions, children }: Props = $props();
</script>

<div class="card">
    <div class="header">
        <div class="left">
            {#if Icon}
                <span class="icon"><Icon /></span>
            {/if}
            <p class="title">{title}</p>
        </div>
        <div class="right">
            {#each actions ?? [] as action}
                {@render action()}
            {/each}
        </div>
    </div>
    <div class="content">
        {@render children()}
    </div>
</div>

<style>
    .card {
        background-color: white;
        border-radius: 0.75rem;
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-sizing: border-box;
        width: 100%;
    }

    .header {
        font-size: 1.25rem;
        font-weight: 600;
        color: #334155;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;
        }
    }

    .right {
        display: flex;
        gap: 5px;
    }

    .title {
        margin: 0.5rem 0;
    }

    .icon {
        margin-right: 10px;
    }
</style>
