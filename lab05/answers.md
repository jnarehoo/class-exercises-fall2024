# Lab 5: Package Management Tutorial
Please complete the hands-on activities associated with this lab outlined in the <a href="https://csci338.github.io/fall2024/assignments/lab05" target="_blank">Lab 5 Instructions</a> (on the course website). When you're done, answer the following questions. Feel free to use Google / ChatGPT to help you think about these questions (but keep in mind that you'll need to know them for the midterm exam).

## Part 1. Operating System Package Managers
Answer the questions for either Homebrew or apt (depending on whether you're using Linux / WSL or Windows)
1. What is Homebrew / apt, and why is it useful?
	Homebrew is a package management system and it is useful because it allows you to easily install packages and tools you may need.
2. What does the `update` command do (either `brew update` or `apt-get update`)?
	It reinstalls brew if its not the most recent version. 

3. Where are the packages that are managed by Homebrew / apt stored on your local computer?
boost		c-ares		gettext		innoextract	libnghttp2	libuv		node		tree		xz
brotli		ca-certificates	icu4c		libidn2		libunistring	lz4		openssl@3	wget		zstd

## Part 2.
1. What is a python virtual environment? A virtual environment lets you use python without interacting with python installed on the computer. 

2. What is Poetry, and how is it different from other Python package managers like pip? Poetry is like brew in that it lets you install 
packages just specifically for python. Poetry is able to handle dependencies better than pip and handles a lot more on the back end so there is less
for us to do. 

3. What happened when you issued the `poetry new poetry-demo` command?
It printed "Created package poetry_demo in poetry-demo" to the command line. 

4. How do you run a python file using the poetry virtual environment? You use "poetry run python codeName.py" 

5. What is the purpose of the `poetry.lock` file? It "locks" the version of dependencies installed.


## Part 3.
1. What are some of the things that `package.json` is used for? It contains metadata, dependencies and scripts. 

2. Why wouldn't you want to check in the `node_modules` directory into GitHub?
It can be large because of things installed. It can also be created if you run npm install with the appropriate json files. 

