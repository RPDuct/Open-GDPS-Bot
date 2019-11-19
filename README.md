# Open GDPS Bot
An open source discord bot for Geometry Dash private servers

## How to setup

### Server side
First you install this repo. Unpack the zip and place the [bot](bot/) folder in your main folder of your GDPS (the main folder is the folder with all the main files and folders and is most of the time the database folder).

### Bot
First go to the [discord dev portal](https://discordapp.com/developers/applications/) and make a new application (use an original name because you can't make a bot with an application name like `bot`).
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img1.png)
<br><br><br>
Go to bot and add a new one.
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img2.png)
<br><br><br>
Change the username and change the profile picture (if you want) and copy the token (you are going to need that later)
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img3.png)
<br><br><br>

Then, you get the files from the [main](main/) folder and put those on a new **PRIVATE** GitHub repository and edit the [config file](main/config.json).

#### Config file
prefix: Change this to the prefix you want to use (keeping it empty also works but it isn't recommended).<br><br>
token: Paste the token you copied from the discord dev portal in this string (**DON'T SHARE THIS TOKEN**).<br><br>
ownerid: Replace this with your discord userID, this will give you access to the owner commands. If you don't know how to get a userID read [this](https://support.discordapp.com/hc/nl/articles/360000291932).<br><br>
host: Put the main folder of your GDPS here **WITHOUT** a `/` at the end.<br><br>
ratechannel: put the channel ID where you want the bot to report new rates. Leaving it empty will make the bot not send new rates. To copy a channel ID just right click on the channel and copy the ID.<br><br>
emotes: Make a small server and add all emotes from [the emote folder](emotes/) and after that for every emote type the message `\:emote name:` and copy what discord puts in the channel and put that in the right emote spot.

### Uploading
The bot should be ready now and now it's just a matter of uploading it.  
Go to the site [Heroku](https://heroku.com) and register a new account if you haven't already.  
Then go to the dashboard and create a new app here.
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img4.png)
<br><br><br>
Once you did that go to `Deploy` and press on the GitHub button.
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img5.png)
<br><br><br>
Connect your GitHub account to Heroku and then type in the repo name of your bot and click search.  
Press connect and scroll all the way down and press `Deploy Branch` (I don't recommend pressing `Enable Automatic Deploys`)  
After the site shows the bot has been deployed go to resources, refresh the page and click the little edit icon first on the web part, disable that, then on the worker part and enable that.
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img6.png)
<br><br><br>
Now press on `More` and then `View logs` and check if the bot gave an output telling you that it's logged in.
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img7.png)
<br><br><br>

### You're done!
Invite your bot with as link `https://discordapp.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&scope=bot&permissions=8` and replace `YOUR_BOT_CLIENT_ID` with the client ID of your bot which you can find here:
<br><br>
![fix your internet bro, this is an image](https://smjs.eu/dibot/img8.png)
<br><br><br>
Just as a last test try the command `[your prefix]test` in the server where your bot is. If this for some reason doesn't work go back to the Heroku console and DM me on discord (SMJS#3044) a screenshot of the console output.
