$(function(){

    var model = {
        current: null,
        kittens: cats.kittens
    };

    var octopus = {
        increment: function() {
            model.current.clicks++;
            catView.render();
        },
        getCats: function() {
            return model.kittens;
        },
        getCurrentCat: function() {
            return model.current;
        },
        setCurrentCat: function(kitten) {
            model.current = kitten; 
        },
        init: function() {
            model.current = model.kittens[0];
            listView.init();
            catView.init();
        }
    };

    var listView = {
        init: function() {
            this.catListElem = document.getElementById('cat-list');
            this.render();
        },
        render: function() {
            var cat, elem, i;
            var cats = octopus.getCats();

            this.catListElem.innerHTML = '';

            for (i = 0; i < cats.length; i++) {
              cat = cats[i];

              elem = document.createElement('li');
              elem.textContent = cat.name;
              elem.addEventListener('click', (function(catCopy) {
                  return function() {
                      octopus.setCurrentCat(catCopy);
                      catView.render();
                  };
              })(cat));
               this.catListElem.appendChild(elem);
            }
        }
    };

    var catView = {
        init: function() {
            this.catNameElem = document.getElementById('cat-name');
            this.catClicksElem = document.getElementById('cat-clicks');
            this.catImgElem = document.getElementById('cat-img');

            this.catImgElem.addEventListener('click', function(){
                octopus.increment();
            });

            catView.render();
        },
        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catNameElem.textContent = currentCat.name;
            this.catClicksElem.textContent = currentCat.clicks;
            this.catImgElem.src = currentCat.img;

        
        } 
    };
    octopus.init();
});