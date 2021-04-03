editorTab = 0; editorTabsub = 0; editingEvent = 0; editingAction = 0;
actionPage = 1;
inEditor = false;
var eventList = []
new Vue({
    el: "#editor",
})
function goEditor() {
    inEditor = true;
}
function goEditorTab(num) {
    var numOld = editorTabsub
    editorTab = num > 2 ? 1 : num
    editorTabsub = num
    console.log(numOld, numOld == 4 && eventList[editingEvent].action.length != 0)
    if (num == 3) {renderEventNav(1);} 
    else if (num == 4) {renderEventNav(2);}
    else {renderEventNav();}
    if (numOld == 3 && eventList.length != 0) {
        eventList[editingEvent].name = document.querySelector('#eventAttribute_Id').innerHTML
        eventList[editingEvent].condition.start = document.querySelector('#eventAttribute_Start').innerHTML
        eventList[editingEvent].condition.end = document.querySelector('#eventAttribute_End').innerHTML
        eventList[editingEvent].condition.interval = document.querySelector('#eventAttribute_Interval').innerHTML
    } else if (eventList.length == 0) return;
    if (numOld == 4 && eventList[editingEvent].action.length != 0) {
        eventList[editingEvent].action[editingAction].type = document.querySelector('#actionType').value
        eventList[editingEvent].action[editingAction].name = document.querySelector('#actionAttribute_Id').innerHTML
        switch (eventList[editingEvent].action[editingAction].type) {
            case 'summon_particle':
                eventList[editingEvent].action[editingAction].attribute = {
                    'tags': document.querySelector('#summon_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML.split(' ')
                }; break;
            case 'edit_particle':
                eventList[editingEvent].action[editingAction].attribute = {
                    'selector': document.querySelector('#edit_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML.split(' ')
                }; break;
            case 'trace_particle':
                eventList[editingEvent].action[editingAction].attribute = {
                    'selector_1': document.querySelector('#trace_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML.split(' '),
                    'selector_2': document.querySelector('#trace_particleWarp > .actionTypeAttribute:nth-of-type(2)').innerHTML.split(' ')
                }; break;
            case 'delete_particle':
                eventList[editingEvent].action[editingAction].attribute = {
                    'selector': document.querySelector('#delete_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML.split(' ')
                }; break;
            case 'edit_level_setting':
                eventList[editingEvent].action[editingAction].attribute = {
                    'settings': document.querySelector('#edit_level_settingWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML
                }; break;
            case 'edit_screen_setting':
                eventList[editingEvent].action[editingAction].attribute = {
                    'settings': document.querySelector('#edit_screen_settingWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML
                }; break;
        }
    } else return;
}
function updateEditor() {
    document.querySelector('#editor').style.display = inEditor ? 'block' : 'none'
    document.querySelector('#tabNav').style.display = inEditor ? 'block' : 'none'
    document.querySelector('#canvas').style.display = inEditor ? 'none' : 'block'
    document.querySelector('#canvasFrame').style.display = inEditor ? 'none' : 'block'
    document.querySelectorAll('.tab').forEach((node) => node.style.display = 'none')
    document.querySelector(`.tab:nth-child(${editorTabsub+1})`).style.display = 'block'
    document.querySelectorAll(`.tabSelect`).forEach((node) => node.classList.remove('active'))
    document.querySelector(`.tabSelect:nth-child(${editorTab+1})`).classList.add('active')
    //document.querySelectorAll('[contenteditable=true]:empty').forEach((node) => node.innerHTML = node.attributes.placeholder.value)
    editor_isvalid = true
    document.querySelectorAll('.globalAttribute').forEach((node, key) => {
        node.classList.remove('invalid')
        if (!checkValid(node, key)) node.classList.add('invalid')
        editor_isvalid = false
    })
    try {
    document.querySelectorAll('#typeActionWarp > div').forEach((node) => node.style.display = "none")
    document.querySelector(`#${document.querySelector('#actionType').value}Warp`).style.display = "block"
    } catch(e) {}
}
function checkValid(element, number) {
    var globalTypes = []
    document.querySelectorAll('.typeElement').forEach((node) => {
        globalTypes.push(node.innerHTML)
    })
    var regex_natrNum = /^[1-9][0-9]{0,3}$/
    var regex_rNum = /^[0-9]{1,4}(?:\.[0-9]{1,2})?$/
    var regex_hexCode = /^[0-9a-f]{8}$|^[0-9a-f]{6}$|^[0-9a-f]{4}$|^[0-9a-f]{3}$/
    var regex_text = /^.{0,20}$/
    var regex_Integer = /^-?[0-9]{1,4}$/
    var regex_Diff = /^[0-8]$/
    var regexList = [regex_natrNum, regex_rNum, regex_hexCode, regex_text, regex_Integer, regex_Diff]
    var indexList = [/* Global Attr */ 3, 3, 5, globalTypes[0] == 'tick' ? 0 : 1, 0, 1, 1, 2, 3, 1, 2, 2, /* Event Attr */ 3, 0, 0, 0]
    
    return element.innerHTML.search(regexList[indexList[number]]) >= 0
}
function ChangeType(TextList) {
    var Index = TextList.indexOf(this.innerHTML) + 1
    if (Index >= TextList.length) {
        Index -= TextList.length
    }
    return TextList[Index];
}
function newEvent() {
    eventList.push(new eventBlock())
    renderEventNav()
}
function addAction() {
    eventList[editingEvent].action.push(new actionBlock())
    renderEventNav(1)
}
function renderEventNav(c=0) {
    document.querySelector('#eventNav').innerHTML = '';
    for (i in eventList) {
        document.querySelector('#eventNav').innerHTML += `<div class="eventTab" onclick="eventTabClick(${i})">${eventList[i].name}</div>`;
    }
    if (c==1) {
        document.querySelector('#eventAttribute_Id').innerHTML = eventList[editingEvent].name
        document.querySelector('#eventAttribute_Start').innerHTML = eventList[editingEvent].condition.start 
        document.querySelector('#eventAttribute_End').innerHTML = eventList[editingEvent].condition.end
        document.querySelector('#eventAttribute_Interval').innerHTML = eventList[editingEvent].condition.interval
        document.querySelector('#eventActionWarp').innerHTML = ''
        for (var i in eventList[editingEvent].action) {
            if (Math.floor(i / 8) != actionPage - 1) continue;
            document.querySelector('#eventActionWarp').innerHTML += `<span class="eventActions" onclick="actionTabClick(${i})"><div>${eventList[editingEvent].action[i].name}</div><div>${eventList[editingEvent].action[i].type}</div></span>`
        }
        if (Math.floor(eventList[editingEvent].action.length / 8) != actionPage - 1) return;
        document.querySelector('#eventActionWarp').innerHTML += '<span class="eventActions" id="actionAdd" onclick="addAction()"><img src="resource/addAction.png" width="40" height="40" style="padding: 0.5vw;">add action</span>'
    }
    if (c==2) {
        document.querySelector('#actionAttribute_Id').innerHTML = eventList[editingEvent].action[editingAction].name
        document.querySelector('#actionType').value = eventList[editingEvent].action[editingAction].type
        document.querySelectorAll('.actionTypeAttribute').forEach((node) => node.innerHTML = '')
        switch (eventList[editingEvent].action[editingAction].type) {
            case 'summon_particle':
                document.querySelector('#summon_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.tags.join(' '); break;
            case 'edit_particle':
                document.querySelector('#edit_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.selector.join(' '); break;
            case 'trace_particle':
                document.querySelector('#trace_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.selector_1.join(' ');
                document.querySelector('#trace_particleWarp > .actionTypeAttribute:nth-of-type(2)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.selector_2.join(' '); break;
            case 'delete_particle':
                document.querySelector('#delete_particleWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.selector.join(' '); break;
            case 'edit_level_setting':
                document.querySelector('#edit_level_settingWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.settings; break;
            case 'edit_screen_setting':
                document.querySelector('#edit_screen_settingWarp > .actionTypeAttribute:nth-of-type(1)').innerHTML = 
                    eventList[editingEvent].action[editingAction].attribute.settings; break;
        }
    }
}
function eventSelect(num) {
    tmpBool = document.querySelector(`.tabSmall:nth-child(${num+1}).active`) != null
    document.querySelectorAll(`.tabSmall`).forEach((node) => node.classList.remove('active'))
    document.querySelector(`.tabSmall:nth-child(${num+1})`).classList.add('active')
    if (tmpBool) document.querySelectorAll(`.tabSmall`).forEach((node) => node.classList.remove('active'))
}
function exportCode() {
    var globalAttrs = []
    var globalTypes = []
    document.querySelectorAll('.globalAttribute').forEach((node) => {
        globalAttrs.push(node.innerHTML)
    })
    document.querySelectorAll('.typeElement').forEach((node) => {
        globalTypes.push(node.innerHTML)
    })
    for (i in globalAttrs) {
        globalAttrs[i] = globalAttrs[i].replace(/\'/g, '\\\'').replace(/\"/g, '\\\"')
    }
    var codeText = `
    levelInit();
    
    levelTickFunction = function() {
        // this function will called every tick
    };
      
    levelFunctions = new Task([
        {callback: function(){
            //some functions here!
        }, time: 0, activated: false},
    ]);
      
    levelTasks = new Task([
        {callback: function(){
            screenSettings.color = '${globalAttrs[8]}'
        }, time: 0, activated: false},
    ]);
      
    levelLoop = setInterval( function () {
        levelLoopCount++;
        //some functions here!
    }, tickSpeed*${globalTypes[0] == 'tick' ? globalAttrs[0] : Math.ceil(globalAttrs[0]*tps)});
    `
    codeText += `particles['player'] = new Particle({'type': 'player', 'hp': '${globalAttrs[1]}', 'playerSpeed': '${globalAttrs[2]}', 'absSize': '${globalAttrs[3]}', 'color': '#${globalAttrs[4]}', 'zIndex': 3});\n`
    codeText += `particles['text'] = new Particle({'type': 'text', 'absSize': '${globalAttrs[6]/100}', 'text': '${globalAttrs[5]}', 'color': '#${globalAttrs[7]}', 'zIndex': 0});`
    return codeText
    /*
        particles['player'] = new Particle({'type': 'player', 'color': '#f00'});
        particles['text'] = new Particle({'type': 'text', 'absSize': 0.20, 'text': 'text!', 'color': '#c49b29', 'zIndex': 0});
        levelTasks.activateAll();*/
}
function exportJSON() {

}
function importJSON() {

}
function runCode() {
    screenState = 'game'
    new Function(exportCode())()
}
function eventTabClick(index) {
    // del
    if (document.querySelector(`.tabSmall:nth-child(2).active`) != null) {
        eventList.splice(index, 1);
        renderEventNav()
        return;
    }
    // dupe
    if (document.querySelector(`.tabSmall:nth-child(3).active`) != null) {
        eventList.push(new eventBlock(toObject(eventList[index])))
        renderEventNav()
        return;
    }
    editingEvent = index
    goEditorTab(3)
    return;
}
function actionTabClick(index) {
    editingAction = index
    goEditorTab(4)
    return;
}
class eventBlock {
    constructor(attrs={}) {
        this.name = attrs.name || `event_${eventList.length+1}`
        this.condition = attrs.condition || {start: 1, end: 100, interval: 1}
        this.action = attrs.action || []
    }
}
class actionBlock {
    constructor(attrs={}) {
        this.type = attrs.type || 'summon_particle'
        this.name = attrs.name || `action_${eventList[editingEvent].action.length+1}`
        this.attribute = attrs.attribute || {'tags': []}
    }
}
function toObject(b) {
    return JSON.parse(JSON.stringify(b))
}