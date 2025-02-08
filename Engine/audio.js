function A_Normal(i)
{
    const audio = new Audio(`Assets/Notes/${i}.mp3`);
    audio.play();
}
function A_Destroy(i)
{
    const audio = new Audio(`Assets/Notes/Destroy/${i}.mp3`);
    audio.play();
}
function A_Crash(i)
{
    const audio = new Audio(`Assets/Notes/Crash/${i}.mp3`);
    audio.play();
}

function A_Play()
{
    const audio = new Audio(`Assets/Notes/play.mp3`);
    audio.play();
}