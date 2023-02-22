import Swiper, { FreeMode, Scrollbar, Mousewheel } from 'swiper';
Swiper.use([FreeMode, Scrollbar, Mousewheel]);

const blogSlider = new Swiper('.constructor-catalog', {
    // Optional parameters
    slidesPerView: 'auto',
    freeMode: true,
    direction: 'vertical',
    // If we need pagination
    scrollbar: {
        el: '.constructor-catalog__scrollbar',
        draggable: true,

    },
    mousewheel: true,

});

const config = {
    default: {
        type: 'hoodie',
        color: 'white',
        size: 'XS',
        place: 'front'
    },
    catalog: [
        {
            slug: 'hoodie',
            name: 'Худи',
            colors: [
                {
                    slug: 'white',
                    name: 'Белый',
                    color: '#FFFFFF',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            name: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'gray',
                    name: 'Серый',
                    color: '#A9A9A9',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'black',
                    name: 'Чёрный',
                    color: '#000000',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'blue',
                    name: 'Синий',
                    color: '#2C4059',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
            ]
        },
        {
            slug: 'shirt',
            name: 'Футболка',
            colors: [
                {
                    slug: 'white',
                    name: 'Белый',
                    color: '#FFFFFF',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                    ]
                },
                {
                    slug: 'black',
                    name: 'Чёрный',
                    color: '#000000',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                    ]
                },
            ]
        },
        {
            slug: 'sweatshirt',
            name: 'Свитшот',
            colors: [
                {
                    slug: 'white',
                    name: 'Белый',
                    color: '#FFFFFF',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'gray',
                    name: 'Серый',
                    color: '#A9A9A9',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'black',
                    name: 'Чёрный',
                    color: '#000000',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
                {
                    slug: 'blue',
                    name: 'Синий',
                    color: '#2C4059',
                    places: [
                        {
                            slug: 'front',
                            name: 'Грудь',
                            marginTop: -35,
                        },
                        {
                            slug: 'back',
                            name: 'Спина',
                            marginTop: -100,
                        },
                    ]
                },
            ]
        },
    ]
}

class TypeField{
    constructor(app, root) {
        this.app = app;
        this.root = root;
        this.#init();
        this.#bindListeners();
    }

    addRadioButton(name, slug) {
        let checkedStr = (slug == this.app.activeType) ? 'checked' : '';
        let newButton = document.createElement('label');
        newButton.classList.add('filter-block__label');
        newButton.innerHTML = `
            <input class="filter-block__radiobox" type="radio" name="type" value="` + slug + `" ` + checkedStr + `>
            <div class="filter-block__custom-radiobox">` + name + `</div>
        `;
        this.root.append(newButton);
    }

    #init() {
        this.app.getCatalogTypes().forEach((elem) => {
            this.addRadioButton(elem.name, elem.slug);
        });
    }

    #bindListeners() {
        let radiobuttons = this.root.querySelectorAll('.filter-block__radiobox');
        if(radiobuttons.length > 0) {
            radiobuttons.forEach(button => {
                button.addEventListener('change', (event) => {
                    this.app.activeType = button.value;
                    this.app.update();
                })
            });
        }
    }
}

class ColorField{
    constructor(app, root) {
        this.app = app;
        this.root = root;
        this.#init();
        this.#bindListeners();
    }

    addRadioButton(name, slug, color) {
        let checkedStr = (slug == this.app.activeColor) ? 'checked' : '';
        let newButton = document.createElement('label');
        newButton.classList.add('filter-block__label');
        newButton.innerHTML = `
            <input class="filter-block__radiobox" type="radio" name="color" value="` + slug + `" ` + checkedStr + `>
            <div class="filter-block__custom-radiobox filter-block__custom-radiobox_color" title="` + name + `" style="background-color: ` + color + `"></div>
        `;
        this.root.append(newButton);
    }

    #init() {
        this.app.getCatalogActiveColors().forEach((elem) => {
            this.addRadioButton(elem.name, elem.slug, elem.color);
        });
    }

    #bindListeners() {
        let radiobuttons = this.root.querySelectorAll('.filter-block__radiobox');
        if(radiobuttons.length > 0) {
            radiobuttons.forEach(button => {
                button.addEventListener('change', (event) => {
                    this.app.activeColor = button.value;
                    this.app.update();
                })
            });
        }
    }
}

class SizeField{
    constructor(app, root) {
        this.app = app;
        this.root = root;   
    }
}

class PlaceField{
    constructor(app, root) {
        this.app = app;
        this.root = root;
        this.#init();
        this.#bindListeners();
    }

    addRadioButton(name, slug) {
        let checkedStr = (slug == this.app.activePlace) ? 'checked' : '';
        let newButton = document.createElement('label');
        newButton.classList.add('filter-block__label');
        newButton.innerHTML = `
            <input class="filter-block__radiobox" type="radio" name="place" value="` + slug + `" ` + checkedStr + `>
            <div class="filter-block__custom-radiobox">` + name + `</div>
        `;
        this.root.append(newButton);
    }

    #init() {
        this.app.getCatalogActivePlaces().forEach((elem) => {
            console.log(elem);
            this.addRadioButton(elem.name, elem.slug);
        });
    }

    #bindListeners() {
        let radiobuttons = this.root.querySelectorAll('.filter-block__radiobox');
        if(radiobuttons.length > 0) {
            radiobuttons.forEach(button => {
                button.addEventListener('change', (event) => {
                    this.app.activePlace = button.value;
                    this.app.update();
                })
            });
        }
    }
}

class PriceElem{
    constructor(app, root) {
        this.app = app;
        this.root = root;
    }
}

class App{
    constructor(root) {
        this.root = root;
        this.config = config;

        this.activeType = this.config.default.type;
        this.activeColor = this.config.default.color;
        this.activeSize = this.config.default.size;
        this.activePlace = this.config.default.place;

        let typeFieldRoot = root.querySelector('#typeFilter');
        this.typeField = new TypeField(this, typeFieldRoot);

        let colorFieldRoot = root.querySelector('#colorFilter');
        this.colorField = new ColorField(this, colorFieldRoot);

        let sizeFielsRoot = root.querySelector('#sizeFilter');
        this.sizeFiels = new SizeField(this, sizeFielsRoot);

        let placeFieldRoot = root.querySelector('#placeFilter');
        this.placeField = new PlaceField(this, placeFieldRoot);

        let priceElemRoot = root.querySelector('#priceElem');
        this.priceElem = new PriceElem(this, priceElemRoot);

    }

    //Получаем названия всех типов одежды из каталога
    getCatalogTypes() {
        return this.config.catalog;
    }

    getCatalogActiveColors() {
        let colorsArray = [];
        let result;
        this.config.catalog.forEach((type) => {
            if(type.slug == this.activeType) {
                result = type.colors;
                return;
            }
        })
        return result;
    }

    getCatalogActivePlaces() {
        let colorsArray = [];
        let activeTypeIndex = 0;
        let result;
        this.config.catalog.forEach((type) => {
            if(type.slug == this.activeType) {
                return;
            }
            activeTypeIndex++;
        })
        this.config.catalog[activeTypeIndex].colors.forEach((color) => {
            if(color.slug == this.activeColor) {
                result = color.places;
                return;
            }
        })
        return result;
    }

    update() {
        console.log('update');
    }
}

const clothesConstructor = document.querySelector('.constructor');
if(clothesConstructor !== null) {
    new App(clothesConstructor);
}