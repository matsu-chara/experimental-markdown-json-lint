# experimental-markdown-json-lint

lint json in markdown json codeblock

## installation

```sh
npm install -g experimental-markdown-json-lint
experimental-markdown-json-lint "*.md"
```

sample.md

># this is a chapter
>
>here text
>
>## aaa
>
>```json
>{ "a": 1 }
>```
>
>```php
><?php
>echo 'ok';
>```
>
>```json
>{ "b: 'a' }
>```
>
>```json
>{ "b": 2 }
>```
>```json
>{ "x: 2 }
>```
>
>yeah

result

```
sample.md
Parse error on line 1:
{ "b: 'a' }
--^
Expecting 'STRING', '}', got 'undefined'
Parse error on line 1:
{ "x: 2 }
--^
Expecting 'STRING', '}', got 'undefined'
```
