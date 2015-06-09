$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify(cats.kittens);
            }
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        }
    };

    var octopus = {
        getNames: function() {
            var allNames = [],
                allCats = model.getAllCats();
            for (kitten in allCats) {
                allNames[kitten] = allCats[kitten].name;
            }
            return allNames;
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    var view = {
        init: function() {
            this.catList = $('#cat-list');
            view.render();
        },
        render: function() {
            var htmlStr = '';
            octopus.getNames().forEach(function(kittenName){
                htmlStr += '<li class="note">'+ kittenName + '</li>';
            });
           this.catList.html( htmlStr );
        } 
    };
    octopus.init();
});