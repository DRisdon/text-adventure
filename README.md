## TEXT ADVENTURE GAME

**STORY?**

An EVIL wizard has stolen your laptop and disappeared into another dimension! Go get it back! You will encounter strange people and creatures
on your journey, so be prepared for a fight!

**RULES**

Player begins with:
- 10 health
- a macbook charger as a blunt weapon
- no armor (armor just gives you extra health)

You start outside the portal into another dimension. You are presented with 2 choices: go in after the wizard, or go buy a new laptop.
Buying a new laptop ends the game immediately. Going into the portal initiates the game. You will progress through a series of story choices,
some involving dialogue, some involving combat. Wrong choices in combat might lead to you taking damage. You can make choices along the way that
give you more health, or new weapons and armor. If you make it to the final story scene and defeat the final boss without losing all health, you win!

*combat:*
When you make a choice that has you fighting (they will say [combat] next to them), your damage will be compared to the enemy's health. If you can't defeat them in 1 hit, you will take damage for every hit it takes you to win. If your health hits 0, you lose. 

**DOCUMENTATION**

This game is designed to take any story input you may desire, as long as it fits the template.

The scenes array must be an array of scenes, each formatted like this:

`['scene name', 'scene prompt', 'background-image', [['choice 1 prompt', 'choice 1 next scene', [enemy health, enemy damage]]]`

The array of choices can have any number of choices, and the combat stats are optional.
