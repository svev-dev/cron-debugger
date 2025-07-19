<script lang="ts">
    import type { Snippet } from 'svelte';
    import HelpIcon from './icons/HelpIcon.svelte';

    interface Props {
        id: string;
        label: string;
        value: string;
        placeholder?: string;
        tooltip: Snippet;
        onValueChange: (value: string) => void;
        onPaste?: (event: ClipboardEvent) => void;
        onKeydown?: (event: KeyboardEvent) => void;
        ariaLabel?: string;
    }

    let {
        id,
        label,
        value,
        placeholder,
        tooltip,
        onValueChange,
        onPaste,
        onKeydown,
        ariaLabel,
    }: Props = $props();

    let inputEl: HTMLInputElement;

    function focusAndSelectAll() {
        if (inputEl) {
            inputEl.focus();
            const len = inputEl.value.length;
            inputEl.setSelectionRange(0, len);
        }
    }

    // Export functions for parent components
    export { focusAndSelectAll };

    function getCursorPosition(): number {
        return inputEl?.selectionStart || 0;
    }

    function getValueLength(): number {
        return inputEl?.value.length || 0;
    }

    // Export additional functions for parent components
    export { getCursorPosition, getValueLength };
</script>

<div class="cron-field">
    <label for={id} class="cron-label">{label}</label>
    <div class="cron-input-wrapper">
        <input
            {id}
            bind:this={inputEl}
            bind:value
            {placeholder}
            aria-label={ariaLabel}
            type="text"
            class="cron-input-plain"
            oninput={(e) => onValueChange(e.currentTarget.value)}
            onkeydown={onKeydown}
            onpaste={onPaste}
        />
        <div class="cron-help-group">
            <span class="cron-help-icon">
                <HelpIcon />
                <span class="cron-tooltip">{@render tooltip()}</span>
            </span>
        </div>
    </div>
</div>

<style>
    .cron-field {
        position: relative;
    }

    .cron-input-wrapper {
        position: relative;
    }
    .cron-input-plain {
        box-sizing: border-box;
        width: 100%;
        padding: 0.75rem;
        border-width: 1px;
        border-style: solid;
        border-color: #cbd5e1;
        border-radius: 0.375rem;
        transition:
            box-shadow 0.2s,
            border-color 0.2s;
        font-size: 1rem;
    }
    .cron-input-plain:focus {
        outline: none;
        box-shadow: 0 0 0 2px #3b82f6;
        border-color: #3b82f6;
    }

    .cron-label {
        display: block;
        font-size: 0.95rem;
        font-weight: 500;
        color: #334155;
        margin-bottom: 0.25rem;
    }

    .cron-help-group {
        position: absolute;
        right: 1.75rem;
        bottom: 0.5rem;
        transform: translateY(-50%);
    }

    .cron-help-icon {
        position: absolute;
        color: #94a3b8;
        cursor: help;
        display: inline-block;
    }
    .cron-tooltip {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        z-index: 10;
        right: 0;
        top: 120%;
        width: 15rem;
        padding: 0.5rem;
        background: #1e293b;
        color: #fff;
        font-size: 0.8rem;
        border-radius: 0.375rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: opacity 0.2s;
        pointer-events: none;
    }
    .cron-help-icon:hover .cron-tooltip,
    .cron-help-icon:focus .cron-tooltip {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
    }
</style>
