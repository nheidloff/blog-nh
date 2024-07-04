---
id: 1701
title: 'Building Cognitive Question and Answer Systems via Bluemix'
date: '2015-12-09T07:08:12+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1701'
permalink: /article/cognitive-question-answer-systems-bluemix-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4388263108'
custom_permalink:
    - article/cognitive-question-answer-systems-bluemix-watson/
categories:
    - Articles
---

[IBM Watson](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/) provides services to enable cognitive functionality in your own applications. In this article I describe on a high level how to ‘mix’ some of these services to build question and answers systems.

To understand a sample scenario of a cognitive question and answer system watch this two minutes [video](https://youtu.be/BGg9mDpe7kE?t=15m2s) “[Pepper, the robot](https://www.aldebaran.com/en/a-robots/who-is-pepper)“.

In order to build question and answer systems you can use Watson services as [described](https://developer.ibm.com/watson/blog/2015/11/11/watson-question-and-answer-service-to-be-withdrawn/) by Rahul A. Garg. For speech input and output Watson and [IBM Bluemix](https://bluemix.net) provide [Speech to Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html) and [Text to Speech](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/text-to-speech.html) services. For the conversations the [Dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html) and the [Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html) services can be used.

![image](/assets/img/2015/12/NLC-and-Dialog.png)

The dialog and classifier services can be used separately but I think the combination of both of them is very powerful. With the dialog service ([simple sample]({{ "/article/sample-watson-dialog-service-bluemix" | relative_url }})) you define the flow of the conversation, with the classifier service ([simple sample]({{ "/article/Classify-Natural-Language-with-ibm-Watson" | relative_url }})) you can understand more input from users that is not explicitly defined in the dialog definition. In order to demonstrate this I use below the [What’s In Theaters](https://github.com/watson-developer-cloud/movieapp-dialog) application which comes in two versions. The [first version](http://watson-movieapp-dialog.mybluemix.net/watson-movieapp-dialog/dist/index.html#/chatting) uses the dialog service only, the [second version](http://watson-movieapp-nlcdialog.mybluemix.net/watson-movieapp-dialog/dist/index.html#/chatting) additionally the classifier service.

**Version 1 – only dialog service**  
This screenshot shows what the dialog service returns if no classifier is used. Since the question from the user is not defined in the [dialog definition](https://raw.githubusercontent.com/watson-developer-cloud/movieapp-dialog/master/src/main/resources/dialog_files/movieapp-dialog-file.xml), the application displays that it cannot understand the question.

![image](/assets/img/2015/12/dialogclassifier1.png)

**Version 2 – dialog and classifier services**  
The next screenshot shows the second version of the application which uses additionally the classifier. Now the application understands that the question was about actors because the class LookupActors was defined in the classifier’s [training data](https://github.com/watson-developer-cloud/movieapp-dialog/blob/master/src/main/resources/classifier_files/trainSet.csv).

![image](/assets/img/2015/12/dialogclassifier2.png)

Without going in too much detail, here is a high level description of how this can be developed. For a short introduction of the dialog service check out this [sample]({{ "/article/sample-watson-dialog-service-bluemix" | relative_url }}), for an introduction of the classifier service this [sample]({{ "/article/Classify-Natural-Language-with-ibm-Watson" | relative_url }}).

The [Java application](https://github.com/watson-developer-cloud/movieapp-dialog/blob/master/src/main/java/com/ibm/watson/movieapp/dialog/rest/WDSBlueMixProxyResource.java) invokes the classifier service every time it receives input from users and stores the two most likely classes and confidence levels in [variables](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/layout_layout.shtml#layout_variables).

```
Classification classification = nlcService.classify(classifier_id, input);
classInfo = classification.getClasses();
List<NameValue> nameValues = new ArrayList<NameValue>();
nameValues.add(new NameValue("Class1", classInfo.get(0).getName()));
nameValues.add(new NameValue("Class1_Confidence", Double.toString(classInfo.get(0).getConfidence())));
nameValues.add(new NameValue("Class2", classInfo.get(1).getName()));
nameValues.add(new NameValue("Class2_Confidence", Double.toString(classInfo.get(1).getConfidence())));
dialogService.updateProfile(dialog_id, Integer.parseInt(clientId), nameValues);
```

In the [definition](https://raw.githubusercontent.com/watson-developer-cloud/movieapp-dialog/master/src/main/resources/dialog_files/movieapp-dialog%2Bclassifier-file.xml) of the dialog the class names are used as user input if the confidence levels are high enough.

```
<if matchType="ANY" id="profileCheck_2531803">
   <cond varName="Class1_Confidence" operator="GREATER_THEN">0.90</cond>
   <cond varName="Class1_Confidence" operator="EQUALS">0.90</cond>
   <output>
      <prompt/>
      <action varName="Defaulted_Previous" operator="SET_TO_YES"/>
      <action varName="User_Input" operator="APPEND">~{Class1}</action>
      <goto ref="search_2414738">
         <action varName="User_Input" operator="SET_AS_USER_INPUT"/>
      </goto>
   </output>
</if>
```

The class names can then be used in the grammar of input nodes.

```
<folder label="BASE SEQUENCES" id="folder_2414701">
   <action varName="Small_Talk_Count" operator="SET_TO">0</action>
   <action varName="Greeting_Count" operator="SET_TO">0</action>
   <input isAutoLearnCandidate="true" isRelatedNodeCandidate="true" comment="LookupActors ...">
      <grammar>
         <item>LookupActors</item>
         <item>I want to look up actors</item>
         <item>look up actors</item>
         <item>* LookupActors</item>
      </grammar>
      <action varName="Defaulted_Previous" operator="SET_TO_NO"/>
      <output>
         <prompt selectionType="RANDOM">
            <item>I'm afraid I can't look up cast members.</item>
         </prompt>
         <goto ref="getUserInput_2531765"/>
      </output>
      </input>
</folder>
```