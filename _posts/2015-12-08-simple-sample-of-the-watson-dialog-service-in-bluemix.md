---
id: 1694
title: 'Simple Sample of the Watson Dialog Service in Bluemix'
date: '2015-12-08T08:26:59+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1694'
permalink: /article/sample-watson-dialog-service-bluemix/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4385516256'
custom_permalink:
    - article/sample-watson-dialog-service-bluemix/
categories:
    - Articles
---

**Update November 2016**: The dialog service has been deprecated and replaced with the [Conversation](https://console.ng.bluemix.net/catalog/services/conversation/) service.

With the [IBM Watson Dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html) service on [Bluemix](https://bluemix.net) developers can build applications using natural language to automatically respond to user questions, for example functionality to help users to reset their passwords. Below is a simple sample demonstrating how this service works.

Via the dialog users can enter a topic they are interested in to see recent tweets with a positive or negative sentiment. The tweets are received via the [Insights for Twitter](https://www.ng.bluemix.net/docs/#services/Twitter/index.html) service.

![image](/assets/img/2015/12/dialogsimple.png)

The dialog is defined via [XML](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/layout_layout.shtml). There is a good [tutorial](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/tutorial_advanced.shtml) describing how this works. In my sample I use two [variables](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/layout_layout.shtml#layout_variables) to store the input values from users. Via [concepts](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/layout_layout.shtml#layout_concept) you can also define synonyms and you can use [wildcards](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/layout_layout.shtml#layout_input__wildcards_desc) to react to different types of user input.

```
<?xml version="1.0" encoding="UTF-8"?>
<dialog xsi:noNamespaceSchemaLocation="WatsonDialogDocument_1.0.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <flow>
        <folder label="Main">
            <output>
                <prompt selectionType="RANDOM">
                    <item>Hi, I'll show you the latest buzz around a topic of your choice. What topic are you interested in?</item>
                </prompt>
                <goto ref="getUserInput_2442994"/>
            </output>
            <output>
                <prompt selectionType="RANDOM">
                    <item>Bye</item>
                </prompt>
                <getUserInput id="getUserInput_2442994">
                    <search ref="folder_2442998"/>
                </getUserInput>
            </output>
        </folder>
        <folder label="Library">
            <folder label="Live Content" id="folder_2447777">
                <output>
                    <prompt selectionType="RANDOM">
                        <item>Alright. Open this URL to see the tweets: http://insights-search.mybluemix.net/api/1/messages/search?q={Topic}%20AND%20posted%3A2015-07-01%20AND%20sentiment%3A{Sentiment}</item>
                    </prompt>
                </output>
            </folder>
            <folder label="Live Content" id="folder_2442998">
                <input>
                    <grammar>
                        <item>*</item>
                    </grammar>
                    <action varName="Topic" operator="SET_TO_USER_INPUT"/>
                    <output>
                        <prompt selectionType="SEQUENTIAL">
                            <item>Are you interested in positive or negative tweets?</item>
                        </prompt>
                            <getUserInput>
                                <input>
                                    <grammar>
                                        <item>positive</item>
                                    </grammar>
                                    <action varName="Sentiment" operator="SET_TO">positive</action>
                                    <goto ref="folder_2447777"/>
                                </input>
                                <input>
                                    <grammar>
                                        <item>negative</item>
                                    </grammar>
                                    <action varName="Sentiment" operator="SET_TO">negative</action>
                                    <goto ref="folder_2447777"/>
                                </input>
                                <input>
                                    <grammar>
                                        <item>*</item>
                                    </grammar>
                                    <action varName="Sentiment" operator="SET_TO">nothing</action>
                                    <goto ref="folder_2442998"/>
                                </input>
                            </getUserInput>
                    </output>
                </input>
            </folder>
            <folder label="Storage"/>
        </folder>
        <folder label="Global"/>
        <folder label="Concepts">
            <concept>
                <grammar>
                    <item>positive</item>
                    <item>good</item>
                </grammar>
            </concept>
        </folder>
    </flow>
    <entities>
    </entities>
    <constants>
    </constants>
    <variables>
        <var_folder name="Home">
            <var name="Topic" type="TEXT"/>
            <var name="Sentiment" type="TEXT"/>
        </var_folder>
    </variables>
    <settings>
    </settings>
    <specialSettings>
    </specialSettings>
</dialog>
```

In order to test your dialog there is a [dialog tool](https://github.com/watson-developer-cloud/dialog-tool) that can be run either locally or deployed to Bluemix. The tool helps testing the dialog and it also discovers syntax errors. To deploy your dialog you can use the [Java](https://github.com/watson-developer-cloud/java-wrapper) or [Node.js](https://github.com/watson-developer-cloud/dialog-nodejs) sample applications.

To find out more read the [documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/), the [API documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog/api/v1/) or try the online [pizza ordering](http://dialog-demo.mybluemix.net/) sample.

In the simple sample I only display the URL that shows the tweets as JSON. There is a more [advanced sample](https://github.com/watson-developer-cloud/movieapp-dialog) that finds certain movies based on user input. The movies are queried via a REST API provided by themoviedb.org. In order to do this the [dialog](https://raw.githubusercontent.com/watson-developer-cloud/movieapp-dialog/master/src/main/resources/dialog_files/movieapp-dialog-file.xml) service returns JSON with all filters to a Java application.

```
<prompt selectionType="RANDOM">
   <item>"{Search_Now:"{Search_Now}", Recency:"{Recency_Preference}", Rating:"{Certification_Preference}", Genre:"{Genre_Preference}", Index:"{Current_Index}", Page:"{Page}"}"</item>
</prompt>
```

When the dialog service returns this JSON to the [Java application](https://github.com/watson-developer-cloud/movieapp-dialog/blob/master/src/main/java/com/ibm/watson/movieapp/dialog/rest/WDSBlueMixProxyResource.java), the movies are queried and returned to the user.

```
Conversation conversation = dialogService.converse(converseParams);
wdsMessage = StringUtils.join(conversation.getResponse(), " ");
processedText = matchSearchNowPattern(wdsMessage);
...
SearchTheMovieDbProxyResource tmdb = new SearchTheMovieDbProxyResource();
conversationPayload = tmdb.discoverMovies(UtilityFunctions.getPropValue(paramsObj, "Genre"),
   UtilityFunctions.getPropValue(paramsObj, "Rating"),
   UtilityFunctions.getPropValue(paramsObj, "Recency"),
   currentIndex, pageNum, nextSearch || newSearch);
```