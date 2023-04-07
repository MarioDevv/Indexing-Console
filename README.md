# Indexing Console

Indexing is a command-line app that allows users index their URLs.  With different command prompts we will index our URLs without any problems.

### 📦 Installation:

Clone de repository.

```bash
git clone https://github.com/PhPloveerPhP/Indexing-Console.git
```

Install dependencies.

```bash
npm i
```

Build styles.

```bash
npx tailwindcss -i .\src\styles\input.css -o .\dist\output
```

### 📄 Usage:

First of all we launch the server.

```bash
node .\src\services\server.js
```

Secondly we just serve our index.html.  The index must be running on live server if not will not work.

Lastly you just need to run the command prompts to start with the indexing. Here are the commands:

```bash
ind [urls...] - Index a URL. To index more than one url they must be separated by spaces. 

cls/clear - Clear the terminal.

upload - Prompts you the input to upload your credentials. *obligaroty*

whoami - Its me :O!.
```

### :eyes: Examples:

**Info Button**. Just click it and get the info of all the commands

<div style>
    <img src="https://i.imgur.com/8DFMFZh.png" />
</div>

**Upload**. Will return an input file to upload your key.

<div>
    <img src="https://i.imgur.com/3xvuvOR.png" />
</div>

**Ind Command**. Type `ind` followed by the URLs you want to index.

<div>
    <img src="https://i.imgur.com/Tpsd8jS.png" />
</div>

<div>
    <img src="https://i.imgur.com/cSv1ePx.png" />
</div>

https://imgur.com/a/Li71tsC


### :heart: Contributing

Anyone that wants to help me can do it.

 Just code it and push it :).
