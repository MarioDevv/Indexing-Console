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

## Examples

[Examples of how the project can be used, including any sample input/output.]

## Contributing

[Instructions on how to contribute to the project, including any guidelines or standards that should be followed.]

## Issues

[Instructions on how to report issues with the project, including any templates that should be used for bug reports or feature requests.]

## License

[Information on the license that the project is released under, including any copyright or attribution notices that need to be included.]

