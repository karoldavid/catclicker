$(function(){

    var model = {
        admin: false,
        currentCat: null,
        kittens: cats.kittens
    };

    var octopus = {
        activateAdmin: function() {
            model.admin = true;
        },
        increment: function() {
            model.currentCat.clicks++;
            catView.render();
        },
        getCats: function() {
            return model.kittens;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        setCurrentCat: function(kitten) {
            model.currentCat = kitten; 
        },
        init: function() {
            model.currentCat = model.kittens[0];
            catListView.init();
            catView.init();
            adminView.init();
        }
    };

    var adminView = {
        init: function() {
            this.adminButtonElem = document.getElementById('admin');

            this.adminButtonElem.addEventListener('click', function(){
               octopus.activateAdmin();
               alert('clicked');
            });

            adminView.render();
        },
        render: function() {

        }
    };

    var catListView = {
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