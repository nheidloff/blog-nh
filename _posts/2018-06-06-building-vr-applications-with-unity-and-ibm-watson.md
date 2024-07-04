---
id: 2985
title: 'Building VR Applications with Unity and IBM Watson'
date: '2018-06-06T09:20:39+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2985'
permalink: /article/vr-virtual-reality-unity-ibm-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/vr-virtual-reality-unity-ibm-watson/
dsq_thread_id:
    - '6714745994'
categories:
    - Articles
---

I’ve continued to play with [Unity](https://unity3d.com/unity) and the [IBM Watson SDK](https://github.com/watson-developer-cloud/unity-sdk), which allows using cognitive services like speech recognition in Unity projects. With this technology you can not only build games, but also other exciting scenarios. I’ve changed my [Augmented Reality sample]({{ "/article/ar-applications-unity-ibm-watson" | relative_url }}) slightly to run it as a Virtual Reality app that can be experienced via [Google Cardboard](https://vr.google.com/cardboard/) and an iPhone.

The picture shows the two screens showing the 3D character. Users can move the player (themselves) via voice commands and can have conversations with the character, for example:

- **User**: Start to walk
- **User**: Stop
- **User**: How is the weather?
- **Virtual character**: In which location?
- **User**: Munich
- **Virtual character**: The temperature in Munich is currently 24 degrees.
- **User**: How is the weather in Berlin?
- **Virtual character**: The temperature in Berlin is currently 28 degrees.

![image](/assets/img/2018/06/demo.png)

Check out the [video](https://www.youtube.com/watch?v=dAgqvRs0ZaQ) for a short demo. In order to see both screens, open the link on a smartphone and choose ‘3D’ as viewing option. To experience the video in 3D, you need a VR device like the Google Cardboard.

[Get the code from GitHub.](https://github.com/nheidloff/unity-watson-vr-sample) The setup should be pretty straight forward. All you need to do, is to open the project in Unity (it comes with the Watson SDK and Cardboard SDK) and enter your Watson credentials. To run it on an iPhone, check out the README.

Technically the following services and tools are used:

- [Unity](https://unity3d.com/unity)
- [IBM Watson SDK for Unity](https://github.com/watson-developer-cloud/unity-sdk)
- [IBM Watson Speech To Text](https://www.ibm.com/watson/services/speech-to-text/)
- [IBM Watson Assistant](https://www.ibm.com/watson/services/conversation/)
- [IBM Watson Text To Speech](https://www.ibm.com/watson/services/text-to-speech/)
- [Weather Company Data](https://console.bluemix.net/catalog/services/weather-company-data)
- [Google Cardboard](https://developers.google.com/vr/develop/unity/get-started-ios)

Most of the functionality is identical to my previous Augmented Reality sample. For example here are some snippets how to use Watson Speech To Text. First you need to initialize the service with credentials you can get from the [IBM Cloud](https://ibm.biz/nheidloff). The lite account offers access to the Watson services, doesn’t cost anything and you don’t even have to provide a credit card.

```
SpeechToText _speechToText;
Credentials credentials = new Credentials(WATSON_SPEECH_TO_TEXT_USER, WATSON_SPEECH_TO_TEXT_PASSWORD, "https://stream.watsonplatform.net/speech-to-text/api");
_speechToText = new SpeechToText(credentials);
```

Next you start listening by invoking StartListening and defining some options:

```
_speechToText.DetectSilence = true;
_speechToText.EnableWordConfidence = false;
_speechToText.EnableTimestamps = false;
_speechToText.SilenceThreshold = 0.03f;
_speechToText.MaxAlternatives = 1;
...
_speechToText.StartListening(OnSpeechToTextResultReceived, OnRecognizeSpeaker);
```

The callback OnSpeechToTextResultReceived gets the spoken text as input:

```
private void OnSpeechToTextResultReceived(SpeechRecognitionEvent result, Dictionary<string, object> customData) {
  if (result != null && result.results.Length > 0) {
    foreach (var res in result.results) {
      foreach (var alt in res.alternatives) { 
        SendMessageToConversation(alt.transcript);                    
      }
    }
  }
}
```

The biggest change from my previous AR sample is the ability to move the player/user with voice commands. In order to do this, I could have added intents like ‘walk’ and ‘stop’ to Watson Assistant. To save the additional roundtrip to Watson Assistant however, I simply check for a hardcoded list of words. For example if the user input contains the word ‘walk’, the player/user starts to walk until the user says ‘stop’. While walking, the direction can simply be changed by looking in another direction.

```
Camera camera = Camera.main;
GameObject player = GameObject.Find("Player");
NavMeshAgent navMeshAgent = player.GetComponent<NavMeshAgent>();
navMeshAgent.SetDestination(player.transform.position + camera.transform.forward);
```

Want to run this sample yourself? Try it out on the [IBM Cloud](https://ibm.biz/nheidloff).