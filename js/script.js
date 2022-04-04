window.addEventListener('DOMContentLoaded', () =>{

    // Tabs

    const tabcontent = document.querySelectorAll('.tabcontent'),
          tabheader = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item');


    function hideTabsContent (){
        tabcontent.forEach((item, i )=>{
            item.classList.remove('show', 'fade');
            item.classList.add('hide');

            tabs[i].classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabcontent[i].classList.remove('hide');
        tabcontent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabheader.addEventListener('click', (e) => {
        target = e.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-01-18';

    function timeDecorator (time){

        if (time >=0 && time < 10){
            return `0${time}`;
        }else{
            return time;
        }
    }
    
    // Подсчет времени
    function setTime(endatime){
        const time = Date.parse(endatime) - Date.parse(new Date()),
              days = Math.floor(time/(1000 * 60 * 60 * 24)),
              hours = Math.floor((time/(1000 * 60 * 60)) % 24),
              minutes = Math.floor((time/(1000 * 60) % 60)),
              seconds = Math.floor((time/1000) % 60);


        return {
            'time': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    
    }
    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock(){
            const t = setTime(endtime);
            days.innerHTML = timeDecorator(t.days);
            hours.innerHTML = timeDecorator(t.hours);
            minutes.innerHTML = timeDecorator(t.minutes);
            seconds.innerHTML = timeDecorator(t.seconds);

            if(t.time <= 0){
                
                clearInterval(timeInterval);
            }
        }
        
    }
    setClock('.timer', deadline);

    // Modal

    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]'),
          openTimerId = setTimeout(openModal, 3000);

    function closeModal(){
    modal.classList.toggle('show');
    document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(openTimerId);
    }

    modalOpenBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) =>{
        if (e.target === modal){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    function showModalByScroll (){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Классы карточек

    class DishCard{
        constructor(image,alt, name, descriprion, price, parentSelector, ...classes){
            this.image = image;
            this.alt = alt;
            this.name = name;
            this.descriprion = descriprion;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                element.classList.add('menu__item');
            }
            else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.image} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.descriprion}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    new DishCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        "'Меню Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container',
        
    ).render();

    new DishCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new DishCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        9,
        '.menu .container',
        'menu__item'
    ).render();
});