<script>
    // @ts-ignore
    import { onMount } from "svelte";

    function applyStored() {
        const stored = localStorage.getItem("theme") ?? "dark";

        if (stored === "dark") {
            window.document.body.classList.remove("dark-mode");
        } else {
            window.document.body.classList.add("dark-mode");
        }
    }

    function toggle() {
        const stored = localStorage.getItem("theme") ?? "dark";

        localStorage.setItem("theme", stored === "dark" ? "light" : "dark");

        window.document.body.classList.toggle("dark-mode");
    }

    onMount(() => applyStored());
</script>

<button on:click={toggle}>
    <img src="/darkMode.png" alt="moon" id="moon" />
    <img src="/lightMode.png" alt="sun" id="sun" />
    <slot />
</button>

<style lang="scss">
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;

        height: 6rem;
        width: 6rem;

        #moon {
            display: none;

            height: 100%;
            width: auto;
        }

        #sun {
            display: block;

            height: 100%;
            width: auto;
        }
    }

    :global(body.dark-mode) button {
        #sun {
            display: none;
        }

        #moon {
            display: block;
        }
    }

    @media only screen and (max-width: 768px) {
        button {
            height: 4rem;
            width: 4rem;
        }
    }
</style>
