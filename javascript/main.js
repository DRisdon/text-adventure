$(document).ready(function() {

  var scenes = [
    ['start', 'An evil wizard from another dimension just stole your laptop, leaving open a portal to his world! What should you do?', '', [
      ['Go into the portal!', 'woods', '', '', '1'],
      ['Go get a new laptop!', 'apple', '', '', '2']
    ]],
    ['woods', 'You step through the portal with only your Macbook charger as a blunt weapon, and find yourself in some woods you\'ve never seen before! All of a sudden, a bandit jumps out from behind a tree and demands all of your money!', './images/backgrounds/forest.jpg', [
      ['Fight!', 'fork', 'weak bandit', '', '3'],
      ['Run away!', 'fork', 'weak bandit', '', '4']
    ]],
    ['fork', 'You come to a fork in the dirt road. On the ground is a stick you can use as a weapon for the time being. On your left, you can see a distant village, but it\'s under attack! Do you go into the town to try to help, or take the path around it?', './images/backgrounds/forest.jpg', [
      ['Go help the town!', 'town_attack', '', 'stick', '5'],
      ['Go around!', 'wolf_attack', '', 'stick', '6']
    ]],
    ['wolf_attack', 'You take the long way, deciding not to help the town. You must really lack empathy! You come upon a wolf, ready to attack!', './images/backgrounds/forest.jpg', [
      ['Fight!', 'rope_bridge', 'wolf', '', '7'],
      ['Run away!', 'rope_bridge', 'wolf', '', '8']
    ]],
    ['town_attack', 'You head into the town, and find a bandit on a rampage! Do you fight him or run?', '', [
      ['Fight!', 'rope_bridge', 'bandit', '', '9'],
      ['Run away!', 'rope_bridge', 'bandit', '', '10']
    ]],
    ['rope_bridge', 'You come to a canyon with an old rope bridge that looks like it might collapse! (this always goes well in movies...) Do you try to cross it, or take the long way around?', '', [
      ['Cross it!', 'over_bridge', '', '', '11'],
      ['Go around!', 'long_way', '', '', '12']
    ]],
    ['over_bridge', 'The bridge holds up just fine! On the other side, you find a small shop selling a few useful items! The shopkeeper says "One item per customer!" What do you buy?', '', [
      ['The sword! (4 damage) - 2 coins', 'mountain_fork', '', 'sword', '13'],
      ['The leather armor! (4 extra health points) - 2 coins', 'mountain_fork', '', 'leather armor', '14'],
      ['A health potion! (heals 2 points) - 1 coin', 'mountain_fork', '', 'healing potion', '15'],
      ['Nothing!', 'mountain_fork', '', '', '16']
    ], 'merchant'],
    ['mountain_fork', 'You reach the foot of a mountain. There are two paths heading up and over it. A strange hermit on the side of the road says, "Take the left path! I PROMISE it\'s safe!" Which path do you choose?', '', [
      ['Left!', 'mountain_left', '', '', '17'],
      ['Right!', 'mountain_right', '', '', '18']
    ], 'hermit'],
    ['mountain_left', 'You take the left path, but after walking for a while, you realize the hermit has been following you. He isn\'t a hermit at all! He\'s another bandit! Who could have guessed!? Fight or run?', '', [
      ['Fight!', 'strong_guy', 'hermit', 'fur armor', '19'],
      ['Run away!', 'strong_guy', 'hermit', '', '20']
    ]],
    ['mountain_right', 'You take the right path, and encounter another wolf! It\'s guarding a dead body that might have useful items! (you weirdo)', '', [
      ['Fight it!', 'strong_guy', 'wolf', 'club', '21'],
      ['Run away!', 'strong_guy', 'wolf', '', '22']
    ]],
    ['strong_guy', 'Along the road, You meet an extremely strong man. "ME WANT FIGHT." he says. Do you fight him?', '', [
      ['Fight!', 'fight_strong_guy', 'strong guy', '', '23'],
      ['Run away!', 'fight_strong_guy', 'strong guy', '', '24'],
      ['Make friends! Maybe he\'s just lonely!', 'befriend_strong_guy', '', 'strong heal', '25']
    ]],
    ['fight_strong_guy', 'You defeat the strong man in battle, and he runs off crying! Maybe he just needed a friend! As you continue down the path, the temperature starts to drop. You find a cave that might be warm, but who knows what might be inside?', '', [
      ['Go inside!', 'warm_cave', '', '', '26'],
      ['Continue through the cold!', 'snow_shop', '', '', '27']
    ]],
    ['befriend_strong_guy', 'You calm the strong man down, and he thanks you by giving you a healing potion! It turns out he just needed a friend, and isn\'t good with words! As you continue down the path, the temperature starts to drop. You find a cave that might be warm, but who knows what might be inside?', '', [
      ['Go inside!', 'warm_cave', '', '', '28'],
      ['Continue through the cold!', 'snow_shop', '', '', '29']
    ]],
    ['warm_cave', 'The cave seems warm at first, especially once you start a fire, but all of a sudden, a cave troll comes in to find you in his den!', '', [
      ['Fight him and get out of there!', 'snow_shop', 'cave troll', '', '30'],
      ['Run away!', 'snow shop', '', '', '31']
    ]],
    ['snow_shop', 'You come to a snowy mountain village with a small shop, where once again you can buy a single item. This deal doesn\'t make much sense. What do you buy?', '', [
      ['The axe! (5 damage) - 4 coins', 'mage_warning', '', 'axe', '32'],
      ['The iron armor! (6 extra health points) - 4 coins', 'mage_warning', '', 'iron armor', '33'],
      ['A health potion! (heals 4 points) - 2 coins', 'mage_warning', '', 'strong healing potion', '34'],
      ['Nothing!', 'mage_warning', '', '', '35']
    ], 'merchant'],
    ['long_way', 'You choose to take the long way around and find another way across the canyon. You find a sturdier bridge and cross it. Halfway across, a bandit attacks! These guys all seem to look alike...', './images/backgrounds/forest.jpg', [
      ['Fight!', 'stranger', 'bandit', 'fur armor', '36'],
      ['Run away!', 'stranger', 'bandit', '', '37']
    ]],
    ['stranger', 'You soon encounter a drunk stranger, who offers you a mystery gift, but won\'t tell you what it is. Do you accept the stranger\'s gift?', './images/backgrounds/forest.jpg', [
      ['Take it!', 'mountain_pass', '', 'club', '36'],
      ['No way!', 'fight_stranger', '', '', '37']
    ], 'drunk guy'],
    ['fight_stranger', 'Oh no! That angered him, and now he\'s attacking!', './images/backgrounds/forest.jpg', [
      ['Fight!', 'mountain_pass', 'stranger', 'club', '38'],
      ['Run away!', 'mountain_pass', '', '', '39']
    ]],
    ['mountain_pass', 'You come to the entrance to an underground passage through a large mountain in front of you, but there are two different entrances. Which do you take?', '', [
      ['Right!', 'mountain_pass_right', '', '', '40'],
      ['Left!', 'mountain_pass_left', '', '', '41']
    ]],
    ['mountain_pass_right', 'Deep underground, you encounter a skeleton. Suddenly, it jumps to life and attacks! Wow your luck is terrible!', '', [
      ['Fight!', 'mountain_pass_shop', 'skeleton', 'skeleton axe', '42'],
      ['Run away!', 'mountain_pass_shop', 'skeleton', '', '43']
    ]],
    ['mountain_pass_left', 'Deep underground, you encounter a prospector, looking for gold. He hasn\'t found any, but he offers you a sword he found for 2 coins. What a steal!', '', [
      ['Buy it!', 'mountain_pass_shop', '', 'sword', '44'],
      ['Nope!', 'mountain_pass_shop', '', '', '45']
    ], 'prospector'],
    ['mountain_pass_shop', 'You come out the other end of the mountain passage, and find yourself in a village at the foot of the mountain. In town, there is a shop, offering a choice of one item. What do you buy?', '', [
      ['The axe! (5 damage) - 4 coins', 'mage_warning', '', 'axe', '46'],
      ['The iron armor! (6 extra health points) - 4 coins', 'mage_warning', '', 'iron armor', '47'],
      ['A health potion! (heals 4 points) - 2 coins', 'mage_warning', '', 'strong healing potion', '48'],
      ['Nothing!', 'mage_warning', '', '', '49']
    ], 'merchant'],
    ['mage_warning', 'You continue along the road, and are approached by a mysterious cloaked woman. She says "Turn back, or die!" and gets ready to attack!', './images/backgrounds/forest.jpg', [
      ['Fight!', 'rest_town', 'mysterious mage', '', '50'],
      ['Run away!', 'rest_town', 'mysterious mage', '', '60']
    ]],
    ['rest_town', 'After escaping the mysterious mage, you find yourself in a calm town on the edge of a dark, spooky forest. The local shop doesn\'t have great items, will sell you as many items as you can afford! Maybe you should stock up before heading into the dark woods!', '', [
      ['The sword! (4 damage) - 2 coins', 'rest_town', '', 'sword', '61'],
      ['The leather armor! (4 extra health points) - 2 coins', 'rest_town', '', 'leather armor', '62'],
      ['A health potion! (heals 4 points) - 2 coins', 'rest_town', '', 'strong healing potion', '63'],
      ['Continue on with your journey!', 'spooky_woods', '', '', '64']
    ], 'merchant'],
    ['spooky_woods', 'You head out from the village and into the spooky woods. After walking for a while, you are approached by a creepy-looking stranger, who offers you more gold than you could ever imagine. Sounds suspicious. Do you accept?', '', [
      ['Yes!', 'skeleton_attack', '', '', '65'],
      ['No!', 'mercenary_attack', '', '', '66']
    ], 'mage'],
    ['skeleton_attack', 'It was a trick! The strange woman waves her hands around, and a skeleton climbs up out of the ground to attack!', '', [
      ['Fight!', 'mercenary_attack', 'strong skeleton', '', '67'],
      ['Run away!', 'mercenary_attack', 'strong skeleton', '', '68']
    ]],
    ['mercenary_attack', 'The strange woman goes on her way. Suddenly, you are ambushed by a mercenary, hired to murder you!', '', [
      ['Fight!', 'evil_squirrel', 'mercenary', '', '69'],
      ['Run away!', 'evil_squirrel', 'mercenary', '', '70']
    ]],
    ['evil_squirrel', 'After yet another brush with death, you are pleased to encounter a cute squirrel. Do you say hello and pet the little guy? He\'s so cute! Nothing could possibly go wrong!', '', [
      ['Pet him!', 'evil_squirrel_attack', '', '', '71'],
      ['Leave him alone!', 'traveling_merchant', '', '', '72']
    ], 'squirrel'],
    ['evil_squirrel_attack', 'You lean in to pet the squirrel, and suddenly, he grows to a massive size, and prepares to attack!', '', [
      ['Fight!', 'traveling_merchant', 'squirrel', '', '73'],
      ['Run away!', 'traveling_merchant', 'squirrel', '', '74']
    ]],
    ['traveling_merchant', 'You soon encounter a traveling merchant, the first friendly face you\'ve seen since town. She offers to sell you as many items as you\'d like.', '', [
      ['The mace! (6 damage) - 10 coins', 'traveling_merchant', '', 'mace', '75'],
      ['The steel armor! (8 extra health points) - 10 coins', 'traveling_merchant', '', 'steel armor', '76'],
      ['A health potion! (heals 4 points) - 4 coins', 'traveling_merchant', '', 'expensive healing potion', '77'],
      ['Continue on with your journey!', 'spooky_fork', '', '', '78']
    ], 'merchant'],
    ['spooky_fork', 'You arrive at a fork in the road. This one has signs for once! One path leads to the "Spooky Murder Dungeon," (sounds fun!) while the other leads to a place simply called "Murderville." Where do you go?', '', [
      ['Spooky Murder Dungeon!', 'murder_dungeon_1', '', '', '79'],
      ['Murderville!', 'murderville_1', '', '', '80']
    ]],
    ['murder_dungeon_1', 'You decide, due to the lack of a better option, to go to the Spooky Murder Dungeon. Immediately upon entering, you are attacked by a skeleton!', '', [
      ['Fight!', 'murder_dungeon_2', 'skeleton', '', '81'],
      ['Run away!', 'murder_dungeon_2', 'skeleton', '', '82']
    ]],
    ['murder_dungeon_2', 'Deeper into the dungeon, you are attacked by a zombie!', '', [
      ['Fight!', 'murder_dungeon_3', 'zombie', '', '83'],
      ['Run away!', 'murder_dungeon_3', 'zombie', '', '84']
    ]],
    ['murder_dungeon_3', 'Continuing on, you are attacked by an even stronger skeleton!', '', [
      ['Fight!', 'murder_dungeon_4', 'skeleton knight', '', '85'],
      ['Run away!', 'murder_dungeon_4', 'skeleton knight', '', '86']
    ]],
    ['murder_dungeon_4', 'Just before you reach the dungeon\'s exit, you are ambushed by a dark mage!', '', [
      ['Fight!', 'final_shop', 'dark mage', 'big evil sword', '87'],
      ['Run away!', 'final_shop', 'dark mage', 'big evil sword', '88']
    ]],
    ['murderville_1', 'You decide, due to the lack of a better option, to go to Murderville. Immediately upon entering the town, you are captured and dragged into an arena and locked in with a bandit! There\'s nowhere to run! "Fight or die!" shouts the arena announcer!', '', [
      ['Fight!', 'murderville_2', 'bandit', '', '89']
    ]],
    ['murderville_2', 'The next battle puts you up against another bandit! Tired of these guys yet?', '', [
      ['Fight!', 'murderville_3', 'bandit', '', '90']
    ]],
    ['murderville_3', 'Up next is a hired mercenary!', '', [
      ['Fight!', 'murderville_4', 'mercenary', '', '91']
    ]],
    ['murderville_4', '"TIME TO DIE," shouts the announcer! The gate opens up, and in marches a huge mountain troll!', '', [
      ['Fight!', 'final_shop', 'mountain troll', '', '92']
    ]],
    ['final_shop', 'After a long series of battles, you escape the danger and head on your way, soon arriving at the entrance to the evil wizard\'s tower! A traveling merchant hiding in the woods offers to sell you one item to help you on the final leg of your journey.', '', [
      ['Buy the knight armor! (10 extra health points) - 15 coins', 'wizard_tower_entrance', '', 'knight armor', '93'],
      ['Buy the megasword! (8 damage) - 15 coins', 'wizard_tower_entrance', '', 'megasword', '94'],
      ['Buy nothing!', 'wizard_tower_entrance', '', '', '95']
    ], 'merchant'],
    ['wizard_tower_entrance', 'The merchant offers to heal you up for your final battles! The passages through the wizard\'s tower are narrow, so it is going to be impossible to escape battles from this point on!', '', [
      ['Go inside!', 'wizard_tower_1', '', 'full heal', '96']
    ]],
    ['wizard_tower_1', 'Upon entering, you are attacked by a mercenary!', '', [
      ['Fight!', 'wizard_tower_2', 'mercenary', '', '97']
    ]],
    ['wizard_tower_2', 'You continue on, only to be ambushed by a skeleton knight!', '', [
      ['Fight!', 'wizard_tower_3', 'skeleton knight', '', '98']
    ]],
    ['wizard_tower_3', 'Further up the tower, A mage attacks!', '', [
      ['Fight!', 'wizard_tower_4', 'dark mage', '', '99']
    ]],
    ['wizard_tower_4', 'As you near the wizard\'s lair, his wizard\'s apprentice approaches you. "You should have backed up your computer!" she shouts, preparing to fight!', '', [
      ['Fight!', 'wizard_tower_5', 'wizard\'s apprentice', '', '100']
    ]],
    ['wizard_tower_5', 'You enter the wizard\'s lair. "HAHAHAHAHAHAHAHAHAHA" he laughs, summoning a massive monster to fight you, before fleeing deeper into his lair!', '', [
      ['Fight!', 'wizard_tower_6', 'demon', '', '101']
    ]],
    ['wizard_tower_6', 'The demon monster was guarding three chests! You find one rusty key lying around that looks like it will break after opening one of them. Which do you open?', '', [
      ['Right!', 'wizard_tower_7', '', 'sword of murder', '102'],
      ['Middle!', 'wizard_tower_7', '', 'stick', '103'],
      ['Left!', 'wizard_tower_7', '', 'gold dragon armor', '104']
    ]],
    ['wizard_tower_7', 'At last, you reach the wizard\'s study. "Chargers for these things are like $80! Yours will be mine!" he says. Time for the final battle!', '', [
      ['Fight!', 'win', 'wizard', '', '105']
    ]],

    ['win', 'You defeated the interdimensional wizard and got your extremely expensive Macbook back! Congrats!', '', [
      ['START OVER', 'start', '', '', '106']
    ]],
    ['lose', 'You\'re dead!', '', [
      ['START OVER', 'start', '', '', '107']
    ]],
    ['apple', 'You bought a new computer! You coward! Now you\'re broke!', '', [
      ['START OVER', 'start', '', '', '108']
    ]]
  ]; // array of scene arrays
  // each scene array = [name, prompt, background, [array of choices], npc]
  // npc is optional, and shouldn't exist in same scene with an enemy
  // each choice array = [text, next scene, enemy, item, identifier]
  //    (combat optional - leave empty if unused) - include enemy in run away choices too
  //    (item optional - empty string if unused)
  // identifier is a string of an integer, to identify a specific choice

  var items = [{ // array of item objects - name, type, damage, cost
      name: 'stick',
      type: 'weapon',
      damage: 2,
      cost: 0,
      image: 'stick'
    },
    {
      name: 'club',
      type: 'weapon',
      damage: 3,
      cost: 0,
      image: 'club'
    },
    {
      name: 'sword',
      type: 'weapon',
      damage: 4,
      cost: 2,
      image: 'sword'
    },
    {
      name: 'axe',
      type: 'weapon',
      damage: 5,
      cost: 4,
      image: 'axe'
    },
    {
      name: 'skeleton axe',
      type: 'weapon',
      damage: 5,
      cost: 0,
      image: 'axe'
    },
    {
      name: 'mace',
      type: 'weapon',
      damage: 6,
      cost: 10,
      image: 'mace'
    },
    {
      name: 'big evil sword',
      type: 'weapon',
      damage: 7,
      cost: 0,
      image: 'megasword'
    },
    {
      name: 'megasword',
      type: 'weapon',
      damage: 8,
      cost: 15,
      image: 'megasword'
    },
    {
      name: 'sword of murder',
      type: 'weapon',
      damage: 10,
      cost: 0,
      image: 'murdersword'
    },
    {
      name: 'fur armor',
      type: 'armor',
      defense: 2,
      cost: 0,
      image: 'furarmor'
    },
    {
      name: 'leather armor',
      type: 'armor',
      defense: 4,
      cost: 2,
      image: 'leatherarmor'
    },
    {
      name: 'iron armor',
      type: 'armor',
      defense: 6,
      cost: 4,
      image: 'ironarmor'
    },
    {
      name: 'steel armor',
      type: 'armor',
      defense: 8,
      cost: 10,
      image: 'steelarmor'
    },
    {
      name: 'knight armor',
      type: 'armor',
      defense: 10,
      cost: 15,
      image: 'knightarmor'
    },
    {
      name: 'gold dragon armor',
      type: 'armor',
      defense: 15,
      cost: 0,
      image: 'dragonarmor'
    },
    {
      name: 'healing potion',
      type: 'heal',
      healing: 2,
      cost: 1
    },
    {
      name: 'strong healing potion',
      type: 'heal',
      healing: 4,
      cost: 2
    },
    {
      name: 'expensive healing potion',
      type: 'heal',
      healing: 4,
      cost: 4
    },
    {
      name: 'strong heal',
      type: 'heal',
      healing: 5,
      cost: 0
    },
    {
      name: 'full heal',
      type: 'heal',
      healing: 20,
      cost: 0
    }
  ];

  var enemies = [{ // array of enemies - name, health, damage, reward, image
      name: 'weak bandit',
      health: 2,
      damage: 1,
      reward: 2,
      image: './images/enemies/bandit.png'
    },
    {
      name: 'bandit',
      health: 4,
      damage: 4,
      reward: 4,
      image: './images/enemies/bandit-mace.png'
    },
    {
      name: 'stranger',
      health: 3,
      damage: 4,
      reward: 4,
      image: './images/enemies/drunkguy.png'
    },
    {
      name: 'hermit',
      health: 5,
      damage: 4,
      reward: 4,
      image: './images/enemies/bandit.png'
    },
    {
      name: 'mercenary',
      health: 7,
      damage: 5,
      reward: 5,
      image: './images/enemies/bandit-mace.png'
    },
    {
      name: 'strong guy',
      health: 5,
      damage: 4,
      reward: 4,
      image: './images/enemies/strongguy.png'
    },
    {
      name: 'mysterious mage',
      health: 6,
      damage: 4,
      reward: 5,
      image: './images/enemies/mage.png'
    },
    {
      name: 'dark mage',
      health: 8,
      damage: 6,
      reward: 2,
      image: './images/enemies/mage.png'
    },
    {
      name: 'wizard\'s apprentice',
      health: 8,
      damage: 7,
      reward: 0,
      image: './images/enemies/mage.png'
    },
    {
      name: 'wolf',
      health: 3,
      damage: 2,
      reward: 0,
      image: './images/enemies/wolf.png'
    },
    {
      name: 'squirrel',
      health: 7,
      damage: 5,
      reward: 6,
      image: './images/enemies/evilsquirrel.png'
    },
    {
      name: 'cave troll',
      health: 8,
      damage: 4,
      reward: 6,
      image: './images/enemies/troll.png'
    },
    {
      name: 'mountain troll',
      health: 8,
      damage: 6,
      reward: 10,
      image: './images/enemies/troll.png'
    },
    {
      name: 'zombie',
      health: 8,
      damage: 3,
      reward: 3,
      image: './images/enemies/zombie.png'
    },
    {
      name: 'skeleton',
      health: 3,
      damage: 4,
      reward: 3,
      image: './images/enemies/skeleton.png'
    },
    {
      name: 'strong skeleton',
      health: 7,
      damage: 4,
      reward: 5,
      image: './images/enemies/skeleton-mace.png'
    },
    {
      name: 'skeleton knight',
      health: 8,
      damage: 5,
      reward: 5,
      image: './images/enemies/skeleton-sword.png'
    },
    {
      name: 'demon',
      health: 21,
      damage: 5,
      reward: 0,
      image: './images/enemies/demon.png'
    },
    {
      name: 'wizard',
      health: 25,
      damage: 7,
      reward: 0,
      image: './images/enemies/wizard.png'
    }
  ];

  var npcs = [{ // array of npcs - name, image
      name: 'merchant',
      image: './images/npc/merchant.png'
    },
    {
      name: 'drunk guy',
      image: './images/npc/drunkstranger.png'
    },
    {
      name: 'squirrel',
      image: './images/npc/squirrel.png'
    },
    {
      name: 'hermit',
      image: './images/npc/hermit.png'
    },
    {
      name: 'prospector',
      image: './images/npc/prospector.png'
    },
    {
      name: 'mage',
      image: './images/enemies/mage.png'
    }
  ]

  var sceneObjects = []; // will be filled with scenes once they are constructed
  var thisScene; //current scene
  var combatText = ''; // for displaying combat results
  var itemText = '';

  var player = { // player object
    maxHealth: 10,
    health: 10,
    damage: 1,
    money: 0,
    weapon: '', // for chosing character image
    armor: '', // for chosing character image
    render: function() {
      $('#player-image').empty();
      $('#player-name').text(localStorage.getItem('name'));
      $('#health').text('Health: ' + this.health + '/' + this.maxHealth);
      $('#damage').text('Damage: ' + this.damage);
      $('#money').text('Money: ' + this.money);
      var $player = $('<div>');
      $player.addClass('player');
      if (player.health <= 0) {
          $player.css('background-image', ('url(./images/player/dead.png)')); // player is dead
      }
      else {
        $player.css('background-image', ('url(./images/player/player-' + this.weapon + '-' + this.armor + '.png)')); // set player image depending on items
      }
      $('#player-image').append($player);
    },
    fight: function(combat) { // get enemy health and damage and calculate combat result
      console.log(combat);
      enemyMaxHealth = combat.health;
      enemyHealth = combat.health;
      enemyDamage = combat.damage;
      reward = Math.floor(Math.random() * (combat.reward - (combat.reward - 2)) + combat.reward - 2) // random reward between 0 and the enemy's reward property
      console.log('Your health: ' + this.health + '/' + this.maxHealth + ' Your damage: ' + this.damage + '.');
      console.log('Enemy health: ' + enemyHealth + ' Enemy damage: ' + enemyDamage);
      if (this.damage >= enemyHealth) { // enemy is killed in 1 turn
        $('#enemy-health').text('Health: 0/' + enemyMaxHealth);
      } else {
        while (enemyHealth > this.damage) { // take turns damaging each other
          enemyHealth -= this.damage; //deal damage
          this.health -= Math.floor(Math.random() * (enemyDamage - Math.max((enemyDamage/3), 1)) + Math.max((enemyDamage/3), 1)); // take damage
        }
      }
      if (player.health <= 0) { // player died
        player.health = 0;
        combatText = 'You fought hard, but couldn\'t win! YOU DIED!';
        $('#enemy-health').text('Health: ' + enemyHealth + '/' + enemyMaxHealth);
      } else {
        combatText = ('It was a tough fight, but you won! health remaining: ' + this.health + '/' + this.maxHealth + '.') // won fight
        $('#enemy-health').text('Health: 0/' + enemyMaxHealth);
      }
      if (reward > 0 && player.health > 0) {
        player.money += reward; // get reward
        combatText += (' You also found ' + reward + ' coin(s) on your enemy!'); // reward for winning
      }
      $('#scene-text').text(combatText);
      player.render();
      $('#choices').empty();
    },
    runAway: function(choice) { // player runs from a fight, taking a random fraction of the enemy's damage
      var escapeDamage = Math.floor(Math.random() * (choice.combat.damage + 2));
      player.health -= escapeDamage;
      if (player.health > 0) { // player successfuly escapes
        combatText = 'You escaped, taking ' + escapeDamage + ' damage in the process!'
        $('#scene-text').text(combatText);
        player.render();
        $('#choices').empty();
      } else { // enemy did too much damage and killed player
        combatText = 'You failed to escape! You died!'
        $('#scene-text').text(combatText);
        player.health = 0;
        player.render();
        $('#choices').empty();
      }
    },
    getItem: function(choice) { // if the choice gives you an item
      var thisItem = items.find(function(item) {
        return item.name === choice.item;
      });
      if (thisItem.name !== 'heal') { // heal = a spell (so no item text)
        if (thisItem.cost > 0 && thisItem.cost <= player.money) { // if it costs money
          itemText = ('You bought the ' + thisItem.name + ' for ' + thisItem.cost + ' coin(s)!')
        } else if (thisItem.cost > player.money) { // can't afford item
          itemText = ('You can\'t afford this item!')
          $('#scene-text').text(combatText + ' ' + itemText);
          player.render();
          $('#choices').empty();
          return;
        } else {
          itemText = ('You got the ' + thisItem.name + '! ');
        }
      }
      if (thisItem.type === 'weapon') { // weapon
        player.getWeapon(thisItem);
      } else if (thisItem.type === 'armor') { // armor
        player.getArmor(thisItem);
      } else if (thisItem.type === 'heal') { // healing item
        player.getHealed(thisItem);
      }
      player.money -= thisItem.cost;
      $('#scene-text').text(combatText + ' ' + itemText);
      player.render();
      $('#choices').empty();
      return thisItem;
    },
    getWeapon: function(thisItem) { // get a new weapon
      if ((thisItem.damage) > player.damage) {
        player.damage = thisItem.damage; //weapon won't increase stats
        itemText += (' New damage: ' + player.damage + '.');
        player.weapon = thisItem.image;
      } else itemText += ' Nothing happened because this weapon is weaker than yours! What a waste!'; // weapon won't increase stats
    },
    getArmor: function(thisItem) { // get new armor
      if ((10 + thisItem.defense) > player.maxHealth) {
        var increase = ((10 + thisItem.defense) - player.maxHealth)
        player.maxHealth = 10 + thisItem.defense; // armor increases current and max health
        player.health = player.health + increase;
        itemText += (' Health increased to: ' + player.health + '/' + player.maxHealth + '.');
        player.armor = thisItem.image;
      } else itemText += (' Nothing happened because this armor is weaker than yours! What a waste!');
    },
    getHealed: function(thisItem) { // get a healing item or spell used on you
      if (player.health + thisItem.healing <= player.maxHealth) { // if item healing won't heal past max health
        player.health += thisItem.healing;
      } else player.health = player.maxHealth; // if item healing would go past max health, just heal to max
      itemText += (' You were healed ' + thisItem.healing + ' Points! New health: ' + player.health + '/' + player.maxHealth + '.');
    },
    reset: function() { // reset player stats for new game
      this.maxHealth = 10;
      this.health = 10;
      this.damage = 1;
      this.weapon = '';
      this.armor = '';
      this.money = 1;
    }
  };

  function makeScene(scene) { // scene constructor
    var newScene = { // set properties name, prompt, and background
      name: scene[0],
      prompt: scene[1],
      background: scene[2],
      npc: (npcs.find(function(npc) {
        return npc.name === scene[4];
      })),
      choices: [],
      render: function() { // render this scene to the DOM
        $('#scene-text').empty();
        $('#choices').empty(); // clear previous scene, choices, and enemy
        $('#enemy').empty();
        $('#enemy-health').empty();
        $('#enemy-damage').empty();
        $('#enemy-name').empty();
        //        console.log(this.background);
        $('#container').css('background-image', 'url(' + this.background + ')');
        var $sceneText = $('<div>');
        $sceneText.addClass('scene');
        $sceneText.text(this.prompt);
        $('#scene-text').append($sceneText); // render scene text
        for (var i in this.choices) { // render choice text
          this.choices[i].render();
          if (this.choices[i].combat !== undefined) { // render an enemy if there is one
            $('#enemy-name').text(this.choices[i].combat.name);
            $('#enemy-health').text('Health: ' + this.choices[i].combat.health + '/' + this.choices[i].combat.health);
            $('#enemy-damage').text('Damage: ' + this.choices[i].combat.damage);
            var $enemyImage = $('<div>');
            $enemyImage.addClass('enemy-image');
            $enemyImage.css('background-image', 'url(' + this.choices[i].combat.image + ')');
            $('#enemy').append($enemyImage);
          }
          else if (this.npc !== undefined) {
            var $enemyImage = $('<div>');
            $enemyImage.addClass('enemy-image');
            $enemyImage.css('background-image', 'url(' + this.npc.image + ')');
            $('#enemy').append($enemyImage);
          }
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
          combat: (enemies.find(function(enemy) {
            return enemy.name === scene[3][i][2];
          })),
          item: scene[3][i][3],
          identifier: scene[3][i][4],
          render: function() {
            var $choice = $('<div>');
            $choice.addClass('choice');
            $choice.addClass(this.identifier);
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
    var chosen = thisScene.choices.find(function(option) { // find choice that was clicked
      return option.identifier === choice.target.classList[1];
    });
    if (chosen.choiceText === 'Run away!') { // running away automatically causes a random number between 0 and the enemy's damage
      player.runAway(chosen);
    } else if (chosen.combat) { // combat if there is any
      player.fight(chosen.combat);
    }
    if (thisScene.name === 'win' || thisScene.name === 'lose' || thisScene.name === 'apple') { // if the game is over, reset stats
      player.reset();
    }
    if (chosen.item.length > 0 && player.health > 0) { // if there is an item and the player is still alive
      player.getItem(chosen);
    }
    if (player.health <= 0 && thisScene.name !== 'lose') { // player is dead and you aren't on the loss screen
      thisScene = sceneObjects.find(function(scene) { // if the player is dead
        return scene.name === 'lose';
      });
    } else if (itemText !== 'You can\'t afford this item!') { // player can afford item or there is no item
      thisScene = sceneObjects.find(function(scene) { // find the scene that choice links to
        return scene.name === chosen.next;
      });
    }
    if (combatText.length > 0 || itemText.length > 0) { // if combat has taken place, display results for 2 seconds before next scene
      setTimeout(function() {
        combatText = '';
        itemText = '';
        thisScene.render();
      }, 2500);
    } else thisScene.render();
  }

  function init() { // start game
    for (var i in scenes) {
      sceneObjects.push(makeScene(scenes[i]));
    }
    console.log(sceneObjects);
    thisScene = sceneObjects[0];
    thisScene.render();
  }


  init();

});
