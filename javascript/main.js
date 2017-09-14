$(document).ready(function() {

  var scenes = [
    ['start', 'WALUIGI IS HUNGRY! WHAT SHOULD HE DO?!?!', '', [
      ['GO GET SOME GROCERIES!', 'groceries'],
      ['GO OUT TO EAT!', 'eat-out']
    ]],
    ['groceries', 'WALUIGI DOESN\'T HAVE ENOUGH MONEY! WHAT SHOULD HE DO?!?!', '', [
      ['GO GET SOME MONEY FROM WARIO!', 'win'],
      ['BE SAD!', 'lose']
    ]],
    ['eat-out', 'WALUIGI HAS TO BATTLE THE WAITER! WHAT DO?!?!', '', [
      ['FIGHT HIM!', 'win', [11, 1]],
      ['RUN AWAY AND BUY GROCERIES!', 'groceries'],
      ['BE SAD!', 'lose']
    ]],
    ['win', 'WOW! WALUIGI ATE AND ISN\'T HUNGRY ANYMORE!', '', [
      ['START OVER', 'start']
    ]],
    ['lose', 'YOU LOSE!', '', [
      ['START OVER', 'start']
    ]]
  ]; // array of scene arrays
  // each array = [name, prompt, background, [array of choices]]
  // each choice = [text, next scene, [enemyHealth, enemyDamage]] (combat array optional)

  var sceneObjects = []; // will be filled with scenes once they are constructed
  var thisScene; //current scene
  var combatText = ''; // for displaying combat results

  var player = { // player object - not in use yet
    maxHealth: 10,
    health: 10,
    damage: 1,
    image: './waluigi.png',
    render: function() {
      var $player = $('<div>');
      $player.addClass('player');
      $player.css('background-image', 'url(' + this.image + ')'); // set player image depending on items
      $('#player-image').append($player);
    },
    fight: function(combat) { // get enemy health and damage and calculate combat result
      enemyHealth = combat[0];
      enemyDamage = combat[1];
      console.log('Your health: ' + this.health + '/' + this.maxHealth + ' Your damage: ' + this.damage);
      console.log('Enemy health: ' + enemyHealth + ' Enemy damage: ' + enemyDamage);
      if (this.damage >= enemyHealth) { // enemy is killed in 1 turn
        console.log('You win in 1 hit! health remaining: ' + this.health + '/' + this.maxHealth);
        return;
      } else {
        while (enemyHealth > this.damage) { // take turns damaging each other
          enemyHealth -= this.damage; //deal damage
          this.health -= enemyDamage; // take damage
        }
      }
      if (player.health <= 0) { // player died
        player.health = 0;
        combatText = 'You fought hard, but couldn\'t win! YOU DIED!';
      } else combatText = ('It was a tough fight, but you won! health remaining: ' + this.health + '/' + this.maxHealth);
    },
    reset: function() { // reset player stats for new game
      this.maxHealth = 10;
      this.health = 10;
      this.damage = 1;
      this.image = './waluigi.png';
    }
  };

  function makeScene(scene) { // scene constructor
    var newScene = { // set properties name, prompt, and background
      name: scene[0],
      prompt: scene[1],
      background: scene[2],
      choices: [],
      render: function() { // render this scene to the DOM
        $('#player-image').empty();
        $('#scene-text').empty();
        $('#choices').empty();
        //        console.log(this.background);
        $('#container').css('background-image', 'url(' + this.background + ')');
        var $sceneText = $('<div>');
        $sceneText.addClass('scene');
        $sceneText.text(this.prompt);
        $('#scene-text').append($sceneText); // render scene text
        for (var i in this.choices) { // render choice text
          this.choices[i].render();
        }
        player.render();
      }
    }
    addChoices(scene, newScene); // add choices to choices array property
    //  console.log(newScene);
    return newScene; // return
  }

  function addChoices(scene, currentScene) { // loop through choice array and add to scene's choices property
    if (scene[3].length > 0) {
      for (var i in scene[3]) {
        var newChoice = {
          choiceText: scene[3][i][0],
          next: scene[3][i][1],
          render: function() {
            var $choice = $('<div>');
            $choice.addClass('choice');
            $choice.addClass(this.next);
            $choice.text(this.choiceText);
            $choice.click(nextScene); // add choice event listeners
            $('#choices').append($choice);
          }
        }
        if (scene[3][i].length > 2) { // if there is an enemy in this scene
          newChoice.combat = scene[3][i][2]; // set combat stats
        }
        currentScene.choices.push(newChoice)
      }
    }
  }

  function nextScene(choice) { // when a choice is clicked
    console.log('CHOICE MADE!');
    var chosen = thisScene.choices.find(function(option) { // find choice that was clicked
      return option.choiceText === choice.target.innerText;
    });
    console.log(chosen.choiceText);
    if (chosen.combat) { // combat if there is any
      player.fight(chosen.combat);
    }
    if (player.health === 0 && thisScene.name !== 'lose') { // player is dead and you aren't on the loss screen
      thisScene = sceneObjects.find(function(scene) { // if the player is dead
        return scene.name === 'lose';
      });
    } else thisScene = sceneObjects.find(function(scene) { // find the scene that choice links to
      return scene.name === chosen.next;
    });
    //console.log(thisScene.name);
    if (thisScene.name === 'start' || thisScene.name === 'lose') { // if the game is over
      player.reset();
    }
    if (combatText.length > 0) { // if combat has taken place, display results for 2 seconds before next scene
      $('#scene-text').text(combatText);
      $('#choices').empty();
      setTimeout(function() {
        combatText = '';
        thisScene.render();
      }, 2000);
    }
    else thisScene.render();
  }

  for (var i in scenes) { // just for testing. main game isn't done yet, although this functions fairly well
    sceneObjects.push(makeScene(scenes[i]));
  }
  console.log(sceneObjects);
  thisScene = sceneObjects[0];
  thisScene.render();

});
