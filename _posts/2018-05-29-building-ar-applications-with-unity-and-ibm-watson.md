---
id: 2978
title: 'Building AR Applications with Unity and IBM Watson'
date: '2018-05-29T12:28:11+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2978'
permalink: /article/ar-applications-unity-ibm-watson/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/ar-applications-unity-ibm-watson/
dsq_thread_id:
    - '6698525646'
categories:
    - Articles
---

Over the last days I’ve enjoyed playing with [Unity](https://unity3d.com/unity) and the [IBM Watson SDK](https://github.com/watson-developer-cloud/unity-sdk), which allows using cognitive services like speech recognition in Unity projects. With this technology you can not only build games, but also other exciting scenarios. I’ve extended an Augmented Reality application from my colleague [Amara Keller](https://medium.com/@MissAmaraKay/build-your-first-ai-ar-app-on-unity-8c12895687fa) which allows iOS users to have conversations with a virtual character.

The [picture](https://raw.githubusercontent.com/nheidloff/unity-watson-ar-sample/master/photo1.png) shows a printed piece of paper with a pattern. When using the app, the 3D character shows up on the paper. Users can have conversations with the character, for example:

- **User**: How is the weather?
- **Virtual character**: In which location?
- **User**: Munich
- **Virtual character**: The temperature in Munich is currently 24 degrees.
- **User**: How is the weather in Berlin?
- **Virtual character**: The temperature in Berlin is currently 28 degrees.

Check out the [video](https://www.youtube.com/watch?v=u8c0fPQOqMU) for a short demo.

{% include embed/youtube.html id='u8c0fPQOqMU' %}

[Get the code from GitHub.](https://github.com/nheidloff/unity-watson-ar-sample)

Technically the following services and tools are used:

- [Unity](https://unity3d.com/unity)
- [Vuforia](https://developer.vuforia.com/)
- [IBM Watson SDK for Unity](https://github.com/watson-developer-cloud/unity-sdk)
- [IBM Watson Speech To Text](https://www.ibm.com/watson/services/speech-to-text/)
- [IBM Watson Assistant](https://www.ibm.com/watson/services/conversation/)
- [IBM Watson Text To Speech](https://www.ibm.com/watson/services/text-to-speech/)
- [Weather Company Data](https://console.bluemix.net/catalog/services/weather-company-data)

The main logic is in this [file](https://github.com/nheidloff/unity-watson-ar-sample/blob/master/SoldierConvo.cs). Let’s take a look how to use the Speech To Text service as an example. First you need to initialize the service with credentials you can get from the [IBM Cloud](https://ibm.biz/nheidloff). The lite account offers access to the Watson services, doesn’t cost anything and you don’t even have to provide a credit card.

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

The application also showcases how to use Watson Assistant and Watson Text To Speech in addition to Watson Speech To Text. Check out the [open source project](https://github.com/nheidloff/unity-watson-ar-sample) for details.

One important thing to keep in mind when using the three Watson services together is the timing. For example you should stop recording before playing an audio clip received from Watson Text To Speech so that Watson doesn’t listen to itself. Also you need to make sure to only play one clip at a time.

I’m neither a Unity, nor a C# expert. So I’m sure there are better ways to do this. Below is how I’ve solved this. I start the recording again only after the duration of the audio clip.

```
private void OnSynthesize(AudioClip clip, Dictionary<string, object> customData) {      
  GameObject audioObject = new GameObject("AudioObject");
  AudioSource source = audioObject.AddComponent<AudioSource>();
  source.loop = false;
  source.clip = clip;
  source.Play();
  Invoke("RecordAgain", source.clip.length);
  Destroy(audioObject, clip.length);
}
```

Want to run this sample yourself? Try it out on the [IBM Cloud](https://ibm.biz/nheidloff).