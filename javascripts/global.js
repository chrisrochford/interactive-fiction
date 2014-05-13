var Global = (function(){

   function init() {
       $(document).keypress(function(e){
           if (e.which == 13){
               Parser.go($("#command").val());
           }
       });

       //preload all data
       $.getJSON( "data/data.json", function(data) {
           window.actions = data.actions;
           window.directions = data.directions;
           window.families = data.families;
           window.npcs = data.npcs;
           window.objects = data.objects;
           window.prepositions = data.prepositions;
           window.rooms = data.rooms;
           window.rules = data.rules;
       });


   }


   return {
     init: init
   };

})();