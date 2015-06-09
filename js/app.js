$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify(cats.kittens);
            }
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },
        getCat: function(num) {
            return JSON.parse(localStorage.cats)[num];
        },
    };

    var octopus = {
        getCatNames: function() {
            var allNames = [],
                allCats = model.getAllCats();
            for (kitten in allCats) {
                allNames[kitten] = allCats[kitten].name;
            }
            return allNames;
        },
        getCurrentCat: function(num) {       
            return model.getCat(num);
        },
        init: function() {
            model.init();
            view.init();
        }
    };

    var view = {
        init: function() {
            this.catList = $('#cat-list');
            this.catShow = $('#cat-show');
            this.currentCatNum = 0;
            view.render();
        },
        render: function() {
            var htmlStr = '';
            if (!this.catList.firstChild) {
                octopus.getCatNames().forEach(function(kittenName){
                    htmlStr += '<li class="cat">'+ kittenName + '</li>';
                });
                this.catList.html( htmlStr );
                
                var list = $('.cat');
                for (var i = 0; i < list.length; i++) {
                    list[i].addEventListener('click', (function(numCopy) {
                        return function() {
                            this.currentCatNum = numCopy;
                            octopus.addClicks(this.currentCatNum);
                            //alert(this.currentCatNum);
                        };
                    })(i));
                }
            }
            var htmlStr = '',
                kitten = octopus.getCurrentCat(this.currentCatNum);
           
            htmlStr += '<h2>' + kitten.name +
                       '</h2><img class="current-cat" src='+ kitten.img +'>' +
                       '<p>Strokes: ' + kitten.clicks + '</p>';
    
            this.catShow.html( htmlStr );

        } 
    };
    octopus.init();
});