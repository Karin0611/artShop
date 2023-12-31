const modals = () => {
    let btnPressed;

    function bindModal(triggersSelector, modalSelector, closeSelector, destroy = true) {
        const trigger = document.querySelectorAll(triggersSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                btnPressed = true;

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`
            });
        });

        modal.addEventListener('click', (e) => {
            if (modal === e.target) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        })

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`
        });

        function calcScroll() {
            let div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

            return scrollWidth;
        }

    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let isAnyModalShown;

           document.querySelectorAll('[data-modal]').forEach(item => {
              if (getComputedStyle(item).display !== 'none') {
                  isAnyModalShown = true;
              }
              if (!isAnyModalShown) {
                  document.querySelector(selector).style.display = 'block';
                  document.body.style.overflow = 'hidden';
                  document.body.style.marginRight = `${scroll}px`
              }

           });
        }, time)
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    openByScroll('.fixed-gift');
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
   // showModalByTime('.popup-consultation', 5000);
}

export default modals;