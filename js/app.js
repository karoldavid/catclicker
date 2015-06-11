$(function(){

    var model = {
        admin: false,
        currentCat: null,
        currentId : 0,
        kittens: cats.kittens
    };

    var octopus = {
        getAdminState: function() {
            return model.admin
        },
        activateAdmin: function() {
            model.admin = true;
            adminView.render();
        },
        deactivateAdmin: function() {
            model.admin = false;
            adminView.render();
        },
        saveData: function(newValues) {
            for (v in newValues) {
                model.currentCat[v] = newValues[v];
            }
            catListView.render();
            catView.render();
        },
        getProperties: function() {
            return Object.keys(model.kittens[0]);
        },
        increment: function() {
            if (!model.admin) {
                model.currentCat.clicks++;
            }
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
            this.adminButtonCancelElem = document.getElementById('cancel');
            this.adminButtonSubmitElem = document.getElementById('submit');
            this.adminInputFormElem = document.getElementById('form');

            this.keys = octopus.getProperties();

            var top = this.adminInputFormElem.childNodes[0];
            for (var key in this.keys) {
                var elem = document.createElement('input');
                elem.id = this.keys[key];
                this.adminInputFormElem.insertBefore(elem, top);  
            }
            
            this.adminButtonElem.addEventListener('click', function(){
               octopus.activateAdmin();
            });

            this.adminButtonCancelElem.addEventListener('click', function(){
               octopus.deactivateAdmin();
            });

            this.adminButtonSubmitElem.addEventListener('click', function(){
               var newValues = [];
               this.keys = octopus.getProperties();
               for (var key in this.keys) {
                    var k = this.keys[key];
                    newValues[k] = document.getElementById(k).value;
                }
               octopus.deactivateAdmin();
               octopus.saveData(newValues);
            });

            adminView.render();

        },
        render: function() {
            if (!octopus.getAdminState()) {
                this.adminInputFormElem.hidden = true;
            } else {
                this.adminInputFormElem.hidden = false;
                for (key in this.keys) {
                    var k = this.keys[key];
                    document.getElementById(k).value = octopus.getCurrentCat()[k];
                } 
            }
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
                    if (!model.admin) {
                      octopus.setCurrentCat(catCopy);
                    }
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