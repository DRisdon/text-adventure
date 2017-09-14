$(document).ready(function() {

  var scenes = [
    ['start', 'WALUIGI IS HUNGRY! WHAT SHOULD HE DO?!?!', '', [
      ['GO GET SOME GROCERIES!', 'groceries', [], ''],
      ['GO OUT TO EAT! BRING YOUR TENNIS RACKET FOR PROTECTION!', 'eat-out', [], 'tennis racket']
    ]],
    ['groceries', 'WALUIGI DOESN\'T HAVE ENOUGH MONEY! WHAT SHOULD HE DO?!?!', '', [
      ['GO GET SOME MONEY FROM WARIO!', 'win', [], ''],
      ['BE SAD!', 'lose', [], '']
    ]],
    ['eat-out', 'WALUIGI HAS TO BATTLE THE WAITER! WHAT DO?!?!', '', [
      ['FIGHT HIM!', 'win', [11, 1], 'waiter\'s suit'],
      ['RUN AWAY AND BUY GROCERIES!', 'groceries', [], ''],
      ['BE SAD!', 'lose', [], '']
    ]],
    ['win', 'WOW! WALUIGI ATE AND ISN\'T HUNGRY ANYMORE!', '', [
      ['START OVER', 'start', [], '']
    ]],
    ['lose', 'YOU LOSE!', '', [
      ['START OVER', 'start', [], '']
    ]]
  ]; // array of scene arrays
  // each scene array = [name, prompt, background, [array of choices]]
  // each choice array = [text, next scene, [enemyHealth, enemyDamage]]
  //    (combat array optional - leave empty if unused)
  //    (item optional - empty string if unused)

  var items = [{
      name: 'tennis racket',
      type: 'weapon',
      damage: 4,
      cost: 0
    },
    {
      name: 'waiter\'s suit',
      type: 'armor',
      defense: 4,
      cost: 0
    }
  ];

  var sceneObjects = []; // will be filled with scenes once they are constructed
  var thisScene; //current scene
  var combatText = ''; // for displaying combat results
  var itemText = '';

  var player = { // player object
    maxHealth: 10,
    health: 10,
    damage: 1,
    money: 5,
    image: './waluigi.png',
    render: function() {
      $('#player-image').empty();
      $('#health').text('Health: ' + this.health + '/' + this.maxHealth);
      $('#damage').text('Damage: ' + this.damage);
      $('#money').text('Money: ' + this.money);
      var $player = $('<div>');
      $player.addClass('player');
      $player.css('background-image', 'url(' + this.image + ')'); // set player image depending on items
      $('#player-image').append($player);
    },
    fight: function(combat) { // get enemy health and damage and calculate combat result
      enemyHealth = combat[0];
      enemyDamage = combat[1];
      console.log('Your health: ' + this.health + '/' + this.maxHealth + ' Your damage: ' + this.damage + '.');
      console.log('Enemy health: ' + enemyHealth + ' Enemy damage: ' + enemyDamage);
      if (this.damage >= enemyHealth) { // enemy is killed in 1 turn
        console.log('You win in 1 hit! health remaining: ' + this.health + '/' + this.maxHealth + '.');
        return;
      }
      else {
        while (enemyHealth > this.damage) { // take turns damaging each other
          enemyHealth -= this.damage; //deal damage
          this.health -= enemyDamage; // take damage
        }
      }
      if (player.health <= 0) { // player died
        player.health = 0;
        combatText = 'You fought hard, but couldn\'t win! YOU DIED!';
      }
      else combatText = ('It was a tough fight, but you won! health remaining: ' + this.health + '/' + this.maxHealth + '.');
      $('#scene-text').text(combatText);
      player.render();
      $('#choices').empty();
    },
    getItem: function(choice) { // if the choice gives you an item
      thisItem = items.find(function(item) {
        return item.name === choice.item;
      });
      console.log(thisItem);
      if (thisItem.cost > 0) { // if it costs money
        itemText = ('You bought the ' + thisItem.name + ' for ' + thisItem.cost + ' coins!')
      }
      else itemText = ('You got the ' + thisItem.name + '!')
      if (thisItem.type === 'weapon') { // weapon
        if ((thisItem.damage) > player.damage) {
          player.damage = thisItem.damage;
          itemText += (' new damage: ' + player.damage + '.');
        }
        else itemText += ' Nothing happened because this weapon is weaker than yours! What a waste!';
      }
      else if (thisItem.type === 'armor') { // armor
        if ((player.maxHealth + thisItem.defense) > player.maxHealth) {
          player.maxHealth = 10 + thisItem.defense;
          player.health = player.health + thisItem.defense;
          itemText += (' new health: ' + player.health + '/' + player.maxHealth + '.');
        }
        else itemText += (' Nothing happened because this armor is weaker than yours! What a waste!');
      }
      else if (thisItem.type === 'heal') { // healing item
        if (player.health + thisItem.healing <= 10) {
          player.health = 10 + thisItem.healing;
        }
        else player.health = 10;
        itemText += (' new health: ' + player.health + '/' + player.maxHealth + '.');
      }
      player.money += thisItem.cost;
      $('#scene-text').text(combatText + ' ' + itemText);
      player.render();
      $('#choices').empty();
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
          combat: scene[3][i][2],
          item: scene[3][i][3],
          render: function() {
            var $choice = $('<div>');
            $choice.addClass('choice');
            $choice.addClass(this.next);
            $choice.text('> ' + this.choiceText);
            $choice.click(nextScene); // add choice event listeners
            $('#choices').append($choice); // render to page
          }
        }
        currentScene.choices.push(newChoice)
      }
    }
  }

  function nextScene(choice) { // when a choice is clicked
    console.log('CHOICE MADE!');
    var chosen = thisScene.choices.find(function(option) { // find choice that was clicked
      return option.next === choice.target.classList[1];
    });
    console.log(chosen.choiceText);
    if (chosen.combat.length > 0) { // combat if there is any
      player.fight(chosen.combat);
    }
    if (player.health === 0 && thisScene.name !== 'lose') { // player is dead and you aren't on the loss screen
      thisScene = sceneObjects.find(function(scene) { // if the player is dead
        return scene.name === 'lose';
      });
    }
    else thisScene = sceneObjects.find(function(scene) { // find the scene that choice links to
      return scene.name === chosen.next;
    });
    //console.log(thisScene.name);
    if (thisScene.name === 'start' || thisScene.name === 'lose') { // if the game is over
      player.reset();
    }
    if (chosen.item.length > 0) { // if there is an item
      player.getItem(chosen);
    }
    console.log(player);
    if (combatText.length > 0 || itemText.length > 0) { // if combat has taken place, display results for 2 seconds before next scene
      setTimeout(function() {
        combatText = '';
        itemText = '';
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
