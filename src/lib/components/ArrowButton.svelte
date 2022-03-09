<script lang="ts">
    type Orientation = "left" | "right";
    export let orientation: Orientation = "left";
    const pointChar = orientation === "left" ? "<" : ">";

    // Sets the way the button moves on hover, tad odd I know
    const hoverTransform = `--hoverTransform: calc(0rem ${pointChar === ">" ? "+" : "-"} 7.5rem / 8);`;
    const baseTransform = `--baseTransform: calc(0rem ${pointChar === ">" ? "-" : "+"} 7.5rem / 8);`;
    const styling = hoverTransform + baseTransform;
</script>

<button on:click style={styling}>
    <p style="margin-left:{pointChar === '>' ? '1rem' : '0'};">
        {pointChar}
    </p>
    <slot />
</button>

<style lang="scss">
    $background-color: #1b2531;
    $background-color-dark: #191f27;
    $coloured-text: #da4167;

    $lightMode-background-color: #fff;
    $lightMode-background-color-dark: #fff;

    button {
        transform: translateX(calc(var(--hoverTransform) * -1));

        width: 7.5rem;
        height: 7.5rem;

        background: $background-color-dark;
        filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

        border: none;
        border-radius: 10px;

        p {
            font-size: 5rem;
            color: #ffffff;
        }

        &:hover {
            transform: translateX(var(--hoverTransform));
            cursor: pointer;
        }
    }

    :global(body.dark-mode) {
        button {
            background: $lightMode-background-color;
        }

        p {
            color: $background-color-dark;
        }
    }

    @media only screen and (max-width: 810px) {
        button {
            width: calc(7.5rem / 1.2);
            height: calc(7.5rem / 1.2);

            p {
                font-size: calc(5rem / 1.5);
            }

            &:hover {
                transform: none;
            }
        }
    }
</style>
