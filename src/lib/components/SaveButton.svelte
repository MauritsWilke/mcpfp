<script lang="ts">
    export let text = "save";
</script>

<button on:click>
    <p>{text}</p>
    <slot />
</button>

<style lang="scss">
    $background-color: #1b2531;
    $background-color-dark: #191f27;
    $coloured-text: #da4167;

    $lightMode-background-color: #fff;
    $lightMode-background-color-dark: #fff;

    button {
        width: 14rem;
        height: 5.5rem;

        background: $background-color-dark;
        filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

        border: none;
        border-radius: 10px;

        p {
            font-size: 3rem;
            color: #ffffff;
        }

        &:hover {
            transform: translateY(-0.5rem);
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
            width: calc(14rem / 1.3);
            height: calc(5.5rem / 1.3);

            p {
                font-size: calc(3rem / 1.3);
            }
        }
    }
</style>
