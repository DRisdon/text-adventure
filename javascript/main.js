$(document).ready(function() {

  var scenes = [['start', 'this is a test', '', [['CHOOSE ME', 'new-test'], ['NO CHOOSE ME!', 'newer-test']]],
                ['new-test', 'this is another test', '', [['CHOOSE ME!!!', 'next'], ['NO CHOOSE ME!!!!', 'other']]],
                ['newer-test', 'this is another test hahahaha', '', []]
              ]; // array of scene arrays
              // each array = [name, prompt, background, [array of choices]]
              // each choice = [text, next scene]

  var sceneObjects = []; // will be filled with scenes once they are constructed

  var thisScene; //current scene

  var player = {
    health: 10,
    image: ''
  };

  function makeScene(scene) { // scene constructor
    var newScene = { // set properties name, prompt, and background
      name: scene[0],
      prompt: scene[1],
      background: scene[2],
      choices: [],
      render: function() { // render this scene to the DOM
        $('#scene-text').empty();
        $('#choices').empty();
        //set background here
        var $sceneText = $('<div>');
        $sceneText.addClass('scene');
        $sceneText.text(this.prompt);
        $('#scene-text').append($sceneText); // render scene text
        for (var i in this.choices) { // render choice text
          var $choice = $('<div>');
          $choice.addClass('choice');
          $choice.addClass(this.choices[i].next)
          $choice.text(this.choices[i].choiceText);
          $choice.click(nextScene); // add choice event listeners
          $('#choices').append($choice);
        }
      }
    }
    addChoices(scene, newScene); // add choices to choices array property
    console.log(newScene);
    return newScene; // return
  }

  function addChoices(scene, currentScene) { // loop through choice array and add to scene's choices property
    if (scene[3].length > 0) {
      for (var i in scene[3]) {
        var newChoice = {
          choiceText: scene[3][i][0],
          next: scene[3][i][1]
        }
        console.log(newChoice.next);
        currentScene.choices.push(newChoice)
      }
    }
  }

  function nextScene(choice) { // when a choice is clicked
    console.log('CHOICE MADE!');
    console.log(choice);
    console.log(choice.target.classList[1]);
    for (var i in sceneObjects) {
      // if a scene in sceneObjects has the same name as the choice's next property, change to that scene
      if (sceneObjects[i].name === choice.target.classList[1]) {
        thisScene = sceneObjects[i]
        sceneObjects[i].render();
      }
    }
  }

  for (var i in scenes) { // just for testing. main game isn't done yet, although this functions fairly well
    sceneObjects.push(makeScene(scenes[i]));
  }
  console.log(sceneObjects);
  thisScene = sceneObjects[0];
  thisScene.render();

});
