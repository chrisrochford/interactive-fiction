var Parser = (function(){

    //----------Private functions----------

    function _parseDirection(str, direction){
        $.each(window.directions, function(i, item) {
            var yesNo = _.contains(item.synonyms, str);
            if (yesNo){
                direction.push(item.id);
            }
        });
        return direction;
    }

    function _parseAction(str, action){
        $.each(window.actions, function(i, item) {
            var yesNo = _.contains(item.synonyms, str);
            if (yesNo){
                action.push(item.id);
            }
        });
        return action;
    }

    function _parseRoom (str, room){
        $.each(window.rooms, function(i, item) {
            var yesNo = _.contains(item.synonyms, str);
            if (yesNo){
                room.push(item.id);
            }
        });
        return room;
    }

    function _parseObject (str, object){
        $.each(window.objects, function(i, item) {
            var yesNo = _.contains(item.synonyms, str);
            if (yesNo){
                object.push(item.id);
            }
        });
        return object;
    }

    function _parsePreposition(str, prep){
        var yesNo = _.contains(window.prepositions, str);
        if (yesNo){
            prep.push(str);
        }
        return prep;
    }

/*    function _determineIntent(parseObject){
        var intent =  false;
        // If Direction is passed, drop all other possibilities
        if ((parseObject.direction).length > 0) {
            if ((parseObject.direction).length > 1){
                intent = "You can only go one direction at a time.";
            } else {
                intent = parseObject.direction[0];
            }
        } else if ((parseObject.action).length > 0) {
            if ((parseObject.action).length > 1) {
                intent = "You can only specify one action at a time."
            } else {
                var actions = window.actions;
                var filter;
                var requires;
                var filter = _.findWhere(actions, {id:parseObject.action[0]});
                var requires = filter.requires;
                if (requires.length > 0){
                    var missing = [];
                    var required = [parseObject.action[0]];
                    $.each(requires, function(i, item){
                        if (!parseObject[item].length){
                            missing.push(item);
                        } else {
                            required.push(parseObject[item]);
                        }
                    });
                    if (missing.length > 0) {
                        intent = missing;
                    } else {
                        intent = required;
                    }
                } else {
                    intent = parseObject.action[0];
                }

            }
        }
        return intent;
    } */

    //---------------Public functions-------------

    function init(){

    }

    function go(str){
        var direction = [];
        var prep = [];
        var action = [];
        var room = [];
        var object = [];
        var npc = [];
        var splitString = str.split(" ");
        $.each(splitString, function(i, item){
            direction = _parseDirection(item, direction);
            prep = _parsePreposition(item, prep);
            action = _parseAction(item, action);
            room = _parseRoom(item, room);
            object = _parseObject(item, object);
        })
        //Now that we have values or false, cast to object
        console.log('Direction: '+ direction + '\nPreposition: '+ prep + '\nAction: '+ action + '\nRoom: '+ room + '\nObject: '+ object + '\nNPC: '+ npc + '\n ');
        var parseObject = {
            direction:direction,
            preposition:prep,
            action:action,
            room:room,
            object:object,
            npc:npc
        }

//        var intent = _determineIntent(parseObject);
//        console.log(intent);
    }

    //---------------Expose public functions-------

    return {
        init: init,
        go: go
    };

})();