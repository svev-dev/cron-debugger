<script lang="ts">
    import { Field, parseCronExpression } from './cron-utils';
    import Input from './Input.svelte';
    import CopyButton from './CopyButton.svelte';
    import Card from './Card.svelte';
    import AsteriskIcon from './icons/AsteriskIcon.svelte';
    import ShareIcon from './icons/ShareIcon.svelte';

    interface Props {
        expression: string;
    }

    let { expression = $bindable() }: Props = $props();

    // Create reactive state for individual field values
    let fieldValues = $state({
        [Field.Minute]: '',
        [Field.Hour]: '',
        [Field.DayOfTheMonth]: '',
        [Field.Month]: '',
        [Field.DayOfTheWeek]: '',
    });

    // Parse the current expression for validation
    const parsed = $derived(parseCronExpression(expression));

    // Initialize field values from expression
    $effect(() => {
        const { values } = parsed;
        fieldValues[Field.Minute] = values[Field.Minute];
        fieldValues[Field.Hour] = values[Field.Hour];
        fieldValues[Field.DayOfTheMonth] = values[Field.DayOfTheMonth];
        fieldValues[Field.Month] = values[Field.Month];
        fieldValues[Field.DayOfTheWeek] = values[Field.DayOfTheWeek];
    });

    // Update expression when any field changes
    $effect(() => {
        const newExpression = [
            fieldValues[Field.Minute],
            fieldValues[Field.Hour],
            fieldValues[Field.DayOfTheMonth],
            fieldValues[Field.Month],
            fieldValues[Field.DayOfTheWeek],
        ]
            .map((part) => part.trim())
            .map((part) => (part === '' ? ' ' : part))
            .join(' ');
        expression = newExpression;
    });

    const fields: Record<Field, any> = $derived({
        [Field.Minute]: {
            label: 'Minute',
            tooltip: minuteTooltip,
            error: parsed.invalidFields.has(Field.Minute),
        },
        [Field.Hour]: {
            label: 'Hour',
            tooltip: hourTooltip,
            error: parsed.invalidFields.has(Field.Hour),
        },
        [Field.DayOfTheMonth]: {
            label: 'Day of Month',
            tooltip: dayOfMonthTooltip,
            error: parsed.invalidFields.has(Field.DayOfTheMonth),
        },
        [Field.Month]: {
            label: 'Month',
            tooltip: monthTooltip,
            error: parsed.invalidFields.has(Field.Month),
        },
        [Field.DayOfTheWeek]: {
            label: 'Day of Week',
            tooltip: dayOfWeekTooltip,
            error: parsed.invalidFields.has(Field.DayOfTheWeek),
        },
    });

    function updateField(field: Field, value: string) {
        fieldValues[field] = value;
    }

    async function handlePaste(event: ClipboardEvent, field: Field) {
        event.preventDefault();

        const clipboardText = await navigator.clipboard.readText();
        const trimmedText = clipboardText.trim();

        if (trimmedText.includes(' ')) {
            // Contains spaces - update the entire expression
            expression = trimmedText;
        } else {
            // No spaces - paste into current input field
            fieldValues[field] = trimmedText;
        }
    }

    // Component instances for input elements
    let inputComponents = $state<Input[]>(Array(5));

    function handleArrowNav(idx: number, event: KeyboardEvent) {
        const input = inputComponents[idx];
        if (!input) return;

        const cursorPos = input.getCursorPosition();
        const valueLength = input.getValueLength();

        if (
            (event.key === 'ArrowRight' || event.key === 'ArrowDown') &&
            cursorPos === valueLength &&
            idx < 4
        ) {
            event.preventDefault();
            inputComponents[idx + 1]?.focusAndSelectAll();
        }
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp') && cursorPos === 0 && idx > 0) {
            event.preventDefault();
            inputComponents[idx - 1]?.focusAndSelectAll();
        }
    }
</script>

{#snippet tooltip(values: string)}
    Valid values {values}.
    <br />
    <br />
    <table class="tooltip-table">
        <tbody>
            <tr>
                <td>All</td>
                <td>*</td>
            </tr>
            <tr>
                <td>Range</td>
                <td>1-5</td>
            </tr>
            <tr>
                <td>Steps</td>
                <td>*/2 or 1-5/2</td>
            </tr>
            <tr>
                <td>List</td>
                <td>1,4-5,7</td>
            </tr>
        </tbody>
    </table>
{/snippet}

{#snippet minuteTooltip()}
    {@render tooltip('0-59')}
{/snippet}

{#snippet hourTooltip()}
    {@render tooltip('0-23')}
{/snippet}

{#snippet dayOfMonthTooltip()}
    {@render tooltip('0-31')}
{/snippet}

{#snippet monthTooltip()}
    {@render tooltip('1-12 and JAN-DEC')}
{/snippet}

{#snippet dayOfWeekTooltip()}
    {@render tooltip('0-7 and SUN-SAT (0 & 7 is SUN)')}
{/snippet}

{#snippet copyButton()}
    <CopyButton value={() => expression} />
{/snippet}

{#snippet shareButton()}
    <CopyButton
        value={() => window.location.href}
        text="Share"
        successText="URL Copied!"
        Icon={ShareIcon}
    />
{/snippet}

<Card title="Expression Builder" Icon={AsteriskIcon} actions={[shareButton, copyButton]}>
    <div class="input-wrapper">
        {#each Object.values(Field) as field, idx}
            <Input
                bind:this={inputComponents[idx]}
                id={field}
                label={fields[field].label}
                placeholder="*"
                value={fieldValues[field]}
                tooltip={fields[field].tooltip}
                onValueChange={(value) => updateField(field, value)}
                onPaste={(event) => handlePaste(event, field)}
                onKeydown={(event) => handleArrowNav(idx, event)}
            />
        {/each}
    </div>
</Card>

<style>
    .input-wrapper {
        display: flex;
        gap: 5px;
    }

    @media (max-width: 700px) {
        .input-wrapper {
            flex-direction: column;
        }
    }
    .tooltip-table td {
        padding-right: 1.5rem;
        min-width: 4rem;
    }
</style>
