<script lang="ts">
    let names = ["SmarteOwl"];

    const name = names[Math.floor(Math.random() * names.length)];

    function typewriter(node, { speed = 1 }) {
        const text = node.textContent;
        const duration = text.length / (speed * 0.01);

        return {
            duration,
            tick: (t) => {
                const i = Math.trunc(text.length * t);
                node.textContent = text.slice(0, i);
            },
        };
    }
</script>

<div id="container">
    <div id="text">
        <a href="/generate">
            {#await Promise.resolve() then}
                <h1 in:typewriter>Generate yours!</h1>
            {/await}
        </a>
    </div>

    <div id="examples">
        <img src="/PFP/I_Like_Cats__.png" alt="example 1" />
        <img src="/PFP/E_Like_Cats__.png" alt="example 2" />
        <img src="/PFP/{name}.png" alt="example 3" />
    </div>
</div>

<style lang="scss">
    $coloured-text: #da4167;
    $image-size: 32rem;
    $fadeIn-distance: 4rem;

    $image-sizes: (
        768px: 60rem,
        1350px: 25rem,
        1600px: 30rem,
        1900px: 38rem,
        2200px: 20vw,
    );

    a {
        text-decoration: none;
    }

    #container {
        // These are the sizes of the nav bar and footer
        height: calc(100vh - 9rem - 5rem);

        display: grid;
        grid-template-columns: 40vw 60vw;

        overflow: hidden;

        #text {
            display: flex;
            align-items: center;
            justify-content: center;

            h1 {
                margin-left: 2vw;

                font-size: 5rem;
                color: $coloured-text;
                text-shadow: 4px 4px 0px rgba(131, 33, 97, 0.6);

                &:hover {
                    transform: translateX(3rem);
                }
            }
        }
    }

    #examples {
        position: relative;

        left: 10vw;

        * {
            top: 10vh;
        }

        $anim-delay: 0.2s;
        :nth-child(1) {
            z-index: 3;

            margin-top: 0;
            margin-right: 0;
        }

        :nth-child(2) {
            z-index: 2;

            margin-top: 9rem;
            margin-left: 30rem;

            animation-delay: $anim-delay;
        }

        :nth-child(3) {
            z-index: 1;

            margin-top: 26rem;
            margin-left: 7rem;

            animation-delay: calc(2 * $anim-delay);
        }
    }

    img {
        position: absolute;

        width: $image-size;
        height: auto;

        filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));
        border-radius: 20px;

        animation: fadeIn 2s;
        animation-fill-mode: forwards;
        transform: translateY($fadeIn-distance);
        opacity: 30%;
    }

    @keyframes fadeIn {
        from {
            opacity: 30%;
            transform: translateY($fadeIn-distance);
        }
        to {
            opacity: 100%;
            transform: translateY(0rem);
        }
    }

    @keyframes fadeInMobile {
        from {
            opacity: 0%;
            transform: translateY($fadeIn-distance);
        }
        to {
            opacity: 100%;
            transform: translateY(0rem);
        }
    }

    @media only screen and (max-width: 810px) {
        $image-size: map-get($image-sizes, 768px);

        #container {
            grid-template-columns: 1fr;
            grid-template-rows: 25vh auto;

            #text h1 {
                font-size: 3rem;
            }
        }

        #examples {
            left: 0;
            top: 0;

            * {
                top: 0;
            }

            :nth-child(n) {
                transform: translateY($fadeIn-distance);
                opacity: 0%;
            }

            :nth-child(1) {
                animation: fadeInMobile 0.7s linear 1s;
                animation-fill-mode: forwards;

                margin-left: calc(7vw);
            }

            :nth-child(2) {
                margin-top: 10vh;
                margin-left: calc(50vw - 0.5 * min(60vw, 30vh));

                animation: fadeInMobile 0.6s linear 0.5s;
                animation-fill-mode: forwards;
            }

            :nth-child(3) {
                margin-top: 20vh;
                margin-left: calc(90vw - min(60vw, 30vh));

                animation: fadeInMobile 0.6s linear 0s;
                animation-fill-mode: forwards;
            }
        }

        img {
            width: 60vw;
            max-width: 30vh;
            height: auto;
        }
    }

    //#region old
    // @media only screen and (max-height: 900px) {
    //     #examples {
    //         * {
    //             top: 5%;
    //         }
    //     }
    // }

    // @media only screen and (min-width: 1100px) {
    //     $image-size: map-get($image-sizes, 1250px);

    //     #container #text h1 {
    //         font-size: 3rem;
    //     }

    //     #examples {
    //         margin-left: 5vw;

    //         :nth-child(1) {
    //             margin-top: 15rem;
    //             margin-right: 2rem;
    //         }

    //         :nth-child(2) {
    //             margin-top: 23rem;
    //             margin-left: calc($image-size - 3rem);
    //         }

    //         :nth-child(3) {
    //             display: none;
    //         }

    //         img {
    //             width: $image-size;
    //             height: auto;
    //         }
    //     }
    // }

    // @media only screen and (min-width: 1250px) {
    //     $image-size: map-get($image-sizes, 1350px);

    //     #container #text h1 {
    //         font-size: 4rem;
    //     }

    //     #examples {
    //         left: 2vw;

    //         :nth-child(1) {
    //             margin-top: 15rem;
    //             margin-right: 2rem;
    //         }

    //         :nth-child(2) {
    //             margin-top: 23rem;
    //             margin-left: calc($image-size - 3rem);
    //         }

    //         :nth-child(3) {
    //             display: initial;
    //             margin-top: 17rem;
    //             margin-left: calc($image-size * 2 - 6rem);
    //         }
    //     }

    //     img {
    //         width: $image-size;
    //         height: auto;
    //     }
    // }

    // @media only screen and (max-width: 1350px) {
    //     $image-size: map-get($image-sizes, 1350px);

    //     #container #text h1 {
    //         font-size: 4rem;
    //     }

    //     #examples {
    //         left: 2vw;

    //         :nth-child(1) {
    //             margin-top: 15rem;
    //             margin-right: 2rem;
    //         }

    //         :nth-child(2) {
    //             margin-top: 23rem;
    //             margin-left: calc($image-size - 3rem);
    //         }

    //         :nth-child(3) {
    //             margin-top: 17rem;
    //             margin-left: calc($image-size * 2 - 6rem);
    //         }
    //     }

    //     img {
    //         width: $image-size;
    //         height: auto;
    //     }
    // }
    //#endregion

    @media only screen and (min-width: 1600px) {
        $image-size: map-get($image-sizes, 1600px);

        #container {
            grid-template-columns: 35vw 65vw;
        }

        img {
            width: $image-size;
            height: auto;
        }

        #examples {
            left: 3vw;

            :nth-child(1) {
                margin-top: 14rem;
                margin-right: 0;
            }

            :nth-child(2) {
                margin-top: 6rem;
                margin-left: calc($image-size + 3rem);
            }

            :nth-child(3) {
                margin-top: 22rem;
                margin-left: calc($image-size * 2 + 6rem);
            }
        }
    }

    @media only screen and (min-width: 1900px) {
        $image-size: map-get($image-sizes, 1900px);

        #container {
            grid-template-columns: 30vw 70vw;

            #text h1 {
                margin-left: 2vw;
                font-size: 5rem;
            }
        }

        img {
            width: $image-size;
            height: auto;
        }

        #examples {
            left: 2vw;

            :nth-child(1) {
                margin-top: 8rem;
                margin-right: 0;
            }

            :nth-child(2) {
                margin-top: 0rem;
                margin-left: calc($image-size + 5rem);
            }

            :nth-child(3) {
                margin-top: 16rem;
                margin-left: calc($image-size * 2 + 10rem);
            }
        }
    }

    @media only screen and (min-width: 2200px) {
        $image-size: map-get($image-sizes, 2200px);

        #container {
            grid-template-columns: 30vw 70vw;

            #text h1 {
                margin-left: 2vw;
                font-size: 5rem;
            }
        }

        img {
            width: $image-size;
            height: auto;
        }

        #examples {
            left: 2vw;

            :nth-child(1) {
                margin-top: 8rem;
                margin-right: 0;
            }

            :nth-child(2) {
                margin-top: 0rem;
                margin-left: calc($image-size + 5rem);
            }

            :nth-child(3) {
                margin-top: 16rem;
                margin-left: calc($image-size * 2 + 10rem);
            }
        }
    }
</style>
