$(function(){

    var data = {
        lastID: 0,
        kittens: cats.kittens
    };

    data.kittens[data.lastID].visible = true;
    data.kittens[data.lastID].id = 0;

    for (var d = 1; d < data.kittens.length; d++) {
         data.kittens[d].visible = false;
         data.kittens[d].id = d;
    }

    var model = {
        init: function() {
            if (!localStorage.data) {
                localStorage.data = JSON.stringify(data.kittens);
            }
        },
        getAllCats: function() {
            return JSON.parse(localStorage.data);
        },
        getCat: function(num) {
            return JSON.parse(localStorage.data)[num];
        },
        hide: function(num) {
            data.kittens[num].visible = false;
        },
        show: function(num) {
            data.kittens[num].visible = true;
            data.lastID = num;
        },
        increase: function(num) {
            data.kittens[num].clicks += 1;
        }
    };

    var octopus = {
        clickedCat: function(num) {
            model.increase(num);
            view.render();
        },
        chosenCat: function(num) {
                model.hide(data.lastID);
                model.show(num);
                view.render();
        },
        getCatNames: function() {
            var allNames = [],
                allCats = model.getAllCats();
            for (kitten in allCats) {
                allNames[kitten] = allCats[kitten].name;
            }
            return allNames;
        },
        getVisibleCats: function() {
            var visibleCats = data.kittens.filter(function(kitten) {
                return kitten.visible;
            });
            return visibleCats;
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
                            octopus.chosenCat(numCopy);
                            //alert(this.numCopy);
                        };
                    })(i));
                }
            }
            var htmlStr = '',
                kitten = octopus.getVisibleCats()[0];
            htmlStr += '<h2>' + kitten.name +
                       '</h2><img class="current-cat" id="' + kitten.id + '" src='+ kitten.img +'>' +
                       '<p>Strokes: ' + kitten.clicks + '</p>';

            this.catShow.html( htmlStr );

            var current = $('.current-cat');
            current[0].addEventListener('click', (function(numCopy) {
                return function() {
                    octopus.clickedCat(numCopy);
                            //alert(this.numCopy);
                        };
                    })(current[0].id));
        
        } 
    };
    octopus.init();
});