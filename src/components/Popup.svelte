<script lang="ts">
    // @ts-ignore because mad
    import { onMount } from "svelte";

    type Type = "default" | "success" | "failed";
    export let type: Type = "default";
    export let message: string = "no text provided";

    const random = `${Math.random()}`.slice(1);

    const colours = {
        default: "#F5F5F5 ",
        success: "#55FF55",
        failed: "#ff5555",
    };

    const styles = `background-color: ${colours[type]}`;

    onMount(() => {
        const self = window.document.getElementsByClassName(random)[0];
        setTimeout(() => {
            self.remove();
        }, 5000);
    });
</script>

<div id="wrapper" class={random}>
    <div id="msg">
        <p style={styles}>{message}</p>
    </div>
</div>

<style lang="scss">
    #wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10000;
        pointer-events: none;

        #msg {
            display: flex;
            justify-content: center;
            margin-top: 90vh;

            p {
                display: block;
                background-color: #ff5555;

                padding-left: 3rem;
                padding-right: 3rem;
                padding-top: 1rem;
                padding-bottom: 1rem;

                font-size: 1.5rem;
                text-align: center;

                border-radius: 10px;

                color: black;

                animation: 0.7s fadeIn ease-in-out, 0.7s fadeOut linear 5s;
            }
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 30%;
            transform: translateY(3rem);
        }
        to {
            opacity: 100%;
            transform: translateY(0rem);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 100%;
        }
        to {
            opacity: 0%;
        }
    }
</style>
