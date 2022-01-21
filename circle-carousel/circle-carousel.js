document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll(".circle-carousel");

    carousels.forEach((carousel) => {

        /**
         * The nodelist containing the carousel elements.
         */
        const cards = carousel.querySelectorAll(".circle-carousel-card");
        /**
         * The current active element.
         */
        const active = carousel.querySelector(".circle-carousel-card.active");
        /**
         * The "previous" button.
         */
        const previous = carousel.querySelector(".circle-carousel-controls.previous");
        /**
         * The "next" button.
         */
        const next = carousel.querySelector(".circle-carousel-controls.next");
        /**
         * The index in the nodelist of the current active element.
         */
        var index = 0;
    
    
        /**
         * Prevent the script to break other scripts if dom does not
         * contains the above elements
         */
        if (cards.length > 0 && previous && next) {
    
            /**
             * Allow 3+ elements carousels to force a 1 by 1 display by adding the **force-format-to-1by1** class.
             */
            const forcedFormat = carousel.classList.contains("force-format-to-1by1");
    
            /**
             * Sets the left card the card before the active one.
             * 
             * Takes the last card if the active one is the first of the nodelist.
             */
            const set_left = () => {
                if (index == 0) {
                    cards[cards.length - 1].classList.add("left");
                } else {
                    cards[index - 1].classList.add("left");
                }
            }
    
            /**
             * Sets the right card the card after the active one.
             * 
             * Takes the first card if the active one is the last of the nodelist.
             */
            const set_right = () => {
                if (index == cards.length - 1) {
                    cards[0].classList.add("right");
                } else {
                    cards[index + 1].classList.add("right");
                }
            }
    
            /**
             * Removes all the animation classes for carousels containing only o
             */
            const remove_animations = () => {
                cards.forEach((card) => {
                    card.classList.remove("to-front-right");
                    card.classList.remove("to-back-right");
                    card.classList.remove("to-front-left");
                    card.classList.remove("to-back-left");
                })
            }
    
            /**
             * Sets the active element in the front depending on the index. For 1 by 1 displays, it also sets an animation to move the previous active to the back.
             * 
             * @param {string} direction | (facultative) The direction where you want to move the cards. Set "previous" if you want the element to slide from back to front by the left side. Set "next" for the right side.
             */
             const set_active = (direction = null, outdatedIndex = null) => {
    
                // For 3 by 3 display
                if (cards.length > 2 && !forcedFormat) {
    
                    cards[index].classList.add("active");
    
                // For 1 by 1 display
                } else if (cards.length == 2 || forcedFormat) {
    
                    if (direction === "previous") {
                        remove_animations();
                        cards[index].classList.add("to-front-left");
                        cards[outdatedIndex].classList.add("to-back-right");
                    } else if (direction === "next") {
                        remove_animations();
                        cards[index].classList.add("to-front-right");
                        cards[outdatedIndex].classList.add("to-back-left");
                    } else {
                        remove_animations();
                        cards[index].classList.add("to-front-right");
                    }
                }
                
            }
    
            /**
             * Change the active element depending the action.
             * 
             * @param {*} action | "next" or "prvious"
             */
                const handleAction = (action = "next") => {
    
                /**
                 * The active element before update.
                 */
                const outdatedIndex = index;
    
                if (action === "previous") {
                    if (index === 0) {
                        index = cards.length - 1;
                    } else {
                        index--;
                    }
                } else if (action === "next") {
                    if (index === cards.length -1) {
                        index = 0;
                    } else {
                        index++;
                    }
                }
                
                if (cards.length > 2 && !forcedFormat) {
                    carousel.querySelector(".active").classList.remove("active")
                    set_active();
                    carousel.querySelector(".right").classList.remove("right")
                    carousel.querySelector(".left").classList.remove("left")
                    set_left();
                    set_right();
                } else if (cards.length === 2 || forcedFormat) {
                    set_active(action, outdatedIndex);
                }
            }
            
    
    
    
    
            // Initialisation
    
            if (active) {
                index = Array.prototype.indexOf.call(cards, active);
            } else {
                set_active();
            }
    
            if (cards.length > 2 && !forcedFormat) {
                if (!carousel.querySelector(".left")) {
                    set_left();
                }
                if (!carousel.querySelector(".right")) {
                    set_right();
                }
                cards.forEach((card) => {
                    card.classList.add("transition")
                })
            }
    
            previous.addEventListener("click", () => {
                handleAction("previous");
            })
            next.addEventListener("click", () => {
                handleAction("next");
            })
    
        }
    })

})