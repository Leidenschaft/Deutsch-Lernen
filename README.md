# Deutsch-Lernen
Complete description of the project can be found under `manual/Introduction.pdf`.

We aim to develop an user-oriented German learning software, whose features include but not limit to dictionary and translator, for students in China who learn German as a second foreign language in university.       
Wir wollen eine Software, die als ein Wörterbuch oder ein Übersetzer funktionieren kann, für die Chinisischen Studentinen und Studenten um ihren Universitätlernen zu helfen machen.       
この項目の目標は、大学生にドイツ語の勉強を手伝するソフトウェアを作る。

# How to use
## Quickstart
```
git clone --depth=1 https://github.com/Leidenschaft/Deutsch-Lernen.git
cp js/config-example.js js/config.js
python3 -m http.server # you can use other ways to start a static file server as well
```

## Requirement
* Chrome or Firefox browser
* Adding new words requires familiarity with xml syntax


## Build docs
If you have latex installed on your operating system, then you can open manual/Introduction.dtx in an editor and typesetting the file with "xelatex".

As a result, you will get the document Introduction.pdf and other generated codes link NounModel.dtd in the same directory.

# Current Usage
You can locally maintain a small dictionary based on html-xml-js framework. 
However, adding new words by scraching xml codes is annoying, 
so we are managing to develop server side codes with Django to automate this process. 
The server side codes can be found at https://github.com/Leidenschaft/DeutschLernen_server.

# About Content Copyright
Because of copyright issues, all images and audios have been removed from this project.

