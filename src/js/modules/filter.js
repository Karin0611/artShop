const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.portfolio-block'),
        no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = "none";
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = "none";
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = "block";
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = "block";
            no.classList.add('animated', 'fadeIn');
        }
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        let targetClass = e.target.classList[0];
        let classSelect = wrapper.querySelectorAll(`.${targetClass}`);
        typeFilter(classSelect);
        items.forEach(item => {
            item.classList.remove('active');
        });
        target.classList.add('active');
    });

}

export default filter;