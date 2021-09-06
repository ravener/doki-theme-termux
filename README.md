# Doki Theme Termux
[doki-theme](https://github.com/doki-theme) ported to Termux styles.

## Install
```sh
# Make sure you have git and nodejs installed.
$ pkg install git nodejs
# Clone the repository locally.
$ git clone https://github.com/ravener/doki-theme-termux
# Switch directory into the new folder.
$ cd doki-theme-termux
# Run the script.
$ node theme.js <theme>
```
Not providing `<theme>` will print a list of available themes.

Take care to backup `~/.termux/colors.properties` if already using a theme and don't want to lose it.

I recommend symlinking the script to the prefix for ease of use:
```sh
$ ln -s /data/data/com.termux/files/home/doki-theme-termux/theme.js /data/data/com.termux/files/usr/bin/doki-theme
```
Now you can run `doki-theme <theme>` from anywhere, anytime.

## License
[MIT License](LICENSE)

I don't own the original styles. I simply scraped off the numbers from [doki-theme-vim](https://github.com/doki-theme/doki-theme-vim) and converted them into the `colors.properties` format that Termux uses and provided a script for easy switching.
