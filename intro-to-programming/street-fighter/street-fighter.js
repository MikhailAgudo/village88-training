// Ken will dodge bullets from machine guns and kill street people

const Entity = (x, y, width, height, hits, speed, name, animations) => {
    const SPEED = speed;
    const SIZE = {
        width: width,
        height: height
    };
    const NAME = name;
    let property = document.createElement('div');

    const initialize = () => {
        property.classList.add('entity');
    }

    return {

    }
}

const Animation = (bgClass, frames, pace) => {

}

const Game = (() => {

    return {

    }
})();

const Engine = (() => {
    const update = () => {

    }

    const display = () => {

    }

    return {

    }
})();

const Controls = (() => {
    return {

    }
})();

const Content = (() => {
    return {

    }
})();

/*

var action = 'STANDING';
var which_frame = 0;

var character1={
    top: 185,
    left: 100,
    health: 100
}
var character2={
    top: 185,
    left: 400,
    health: 100
}

function GameLoop()
{
    displayCharacters();
}

setInterval(GameLoop, 150);


function displayCharacters()
{
    document.getElementById('character1').style.top = character1.top;
    document.getElementById('character1').style.left = character1.left;

    document.getElementById('character2').style.top = character2.top;
    document.getElementById('character2').style.left = character2.left;

    document.getElementById('healthbar1').style.width = character1.health*2.3;
    document.getElementById('healthbar2').style.width	 = character2.health*2.3;


    if(action == 'STANDING')
    {
        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -80px";
        which_frame = which_frame+1;

        if(which_frame >= 4)
        {
            which_frame = 0;
        }
    }
    else if(action == 'PUNCH')
    {
        if(which_frame == 2 && character1.left > character2.left - 150 && character1.left < character2.left + 50)
        {
            character2.health = character2.health-5;
        }
        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -160px";
        which_frame = which_frame+1;

        if(which_frame >= 3)
        {
            which_frame = 0;
            action = 'STANDING';
        }
    }
    else if(action == 'ROUND_KICK')
    {
        if(which_frame == 2 && character1.left > character2.left - 150 && character1.left < character2.left + 50)
        {
            character2.health = character2.health-8;
        }

        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -560px";
        which_frame = which_frame+1;

        if(which_frame >= 5)
        {
            which_frame = 0;
            action = 'STANDING';
        }
    }
}

document.onkeydown = function(e)
{
    console.log(e);
    if(e.keyCode == 37 && character1.left > 0)
    {
        character1.left = character1.left-10;
    }
    else if(e.keyCode == 39 && character1.left < 800)
    {
        character1.left = character1.left+10;
    }
    else if(e.keyCode == 190)
    {
        action = 'PUNCH';
    }
    else if(e.keyCode == 191)
    {
        action = 'ROUND_KICK';
    }

    which_frame = 0;
}
displayCharacters();

*/