# GitLabFa
Persian version of GitLab

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension
2. Add new script with below contents
```javascript
// ==UserScript==
// @name         GitLabFa
// @namespace    http://fararayanesh.ir/
// @version      1.0.0
// @description  Persian version of GitLab
// @author       Mostafa Aboutalebi
// @include      http://gitlab.*
// @include      https://gitlab.*
// @grant        none
// ==/UserScript==

var element = document.createElement("script");
element.src = "https://unpkg.com/persian-date/dist/persian-date.min.js";
document.body.appendChild(element);

element = document.createElement("script");
element.src = "https://unpkg.com/gitlabfa/dist/gitlabfa.js";
document.body.appendChild(element);

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://unpkg.com/gitlabfa/dist/gitlabfa.css');
document.getElementsByTagName('head')[0].appendChild(link);
```
3. Enjoy Persian GitLab and report any bug

[حمایت از پروژه](https://zarinp.al/@aboutalebi)
