---
id: 231
title: 'Sample Composite Application using XPages in Lotus Notes 8.5.1'
date: '2009-10-22T00:00:00+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.eu/article/sample-composite-application-using-xpages-in-lotus-notes-8-5-1/'
permalink: /article/10222009030840AMNHEADY.htm/
URL_before_HTML_Import:
    - 'http://heidloff.net/nh/home.nsf/article.xsp?id=/8.html'
custom_permalink:
    - article/10222009030840AMNHEADY.htm/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4316531252'
categories:
    - Articles
---

 Some images are corrupted below. [See here for fixed version](http://planetlotus.org/5b0784)

As you might know there is a sample application (the extended discussion template) available on OpenNTF ([download here](http://www.openntf.org/Projects/pmt.nsf/1af5f59bae92986c85256bae000f898c/bbadb19d253f7df186257656002410c3!OpenDocument)) with significant improvements to the rich client user experience. I’ve blogged a couple of times about these UX improvements on OpenNTF.org. See [here](http://www.youtube.com/watch?v=1Rih-UlqYNQ) for demo. Today I describe more of the used technology.

 The main goal of the project is to provide a better discussion template. The main goal is not to use certain technologies to push these technologies or to use artifactual scenarios to showcase new features. We’ve done some evaluations and here is what we’ve planned to do. The target platform is Notes/Domino 8.5.1.

 **Web UI**   
 For the web user interface of the discussion template we use XPages for everything.

 This was an obvious choice given all the nice new capabilities XPages provide.

 **Rich Client UI**   
 For the rich client user interface of the discussion template we use a combination of classic Notes app dev, composite applications and XPages.

 We use the Java Views running inside a composite application for the entry page. The main reason is that we wanted to provide a consistent user interface to other Notes 8 style applications like mail. The other reason is that we wanted the best possible user experience for view navigation and rich text editing that is available right now with 8.5.1.

 From this first page you can launch other ‘cloned’ pages by doubleclicking the view entries. I’ve used a technique that my old team implemented when I worked on composite applications – [see here](http://www-10.lotus.com/ldd/compappwiki.nsf/dx/opening-notes-documents-on-pages).

 The second page is another composite application page with these components:   
![image](/assets/img/2009/10/1_08347FCC0834ACC0003318B285257657.gif)

 These components are wired:   
 1. When the response document is loaded it passes the necessary information to the thread viewer.   
 2. The response doc also determines the parent document that is displayed at the bottom.   
 3. When you click on a label in the thread viewer the ‘previewed’ doc at the bottom is changed.   
 4. When you click on icon in the thread viewer (not doubleclick as picture indicates) the document is launched in it’s own tab.   
![image](/assets/img/2009/10/1_0834860C0834ACC0003318B285257657.gif)

 The thread viewer is an XPage because it allows maximal flexibility in terms of user interface design. Also the alternative to use an embedded view didn’t work since it couldn’t display an entry in the thread viewer for the new document before the document was saved. However this is a key scenario for discussions that users want to see where in the hierarchy their document will show up.   
 XPages in 8.5.1 can participate in property broker via the new design element ‘Components’:   
![image](/assets/img/2009/10/1_08348BB40834ACC0003318B285257657.gif)

 The main area of the page uses the new 8.5.1 Notes Document container to display a document and to pass via landmarks data to other components.   
![image](/assets/img/2009/10/1_08348ED80834ACC0003318B285257657.gif)

 The component at the bottom is a Notes component to display a certain Notes document. It uses a nice trick to do this. The frameset has one invisible frame with Notes actions that are triggered via property broker. These actions store the to be displayed Notes URL in a Notes environment variable from which the second visible frame reads this information and displays the right Notes document. The main reason why I haven’t used the Notes Document Container here as well was that I needed a way not only to display a Notes document in this rectangle but also to launch a Notes document in it’s on tab when clicking (one click, not doubleclick as in picture above) the icon next to the label in the thread viewer.

 **Rich Client Extensions**   
 For rich client extensions that will be globally available (not part of the template) I’d like to use Eclipse plugins.

 In this [blog entry](http://www.openntf.org/blogs/openntf.nsf/d6plinks/NHEF-7WVDR4) I’ve describe a little prototype that I want to publish next week. With this tool Notes users can easily copy Notes documents into discussion applications. This tool is not part of one discussion application but always available/visible in the Notes client. So it’s rather an extension to Notes than to the discussion template. I’ve some other tools in mind that could be done in the same way. Stay tuned.

 These extensions could theoretically be installed as part of the discussion application by referencing the Eclipse features in the composite application definition. However then we’d also need a separate update site database with the Eclipse features that always would have to be deployed with the discussion application. Since these extensions are not mandatory, but only optional tools I’d like to keep the standard deployment of the discussion template separate from the Eclipse features. For Eclipse features administrators can use the Widget Catalog to push these features down to certain users/Notes clients. The features could also be installed by users easily from a catalog via drag and drop.

 I encourage you to try out this sample not only to get an updated rich client user experience for discussion applications but also to learn more about the used technologies. You can download the sample [from here](http://www.openntf.org/Projects/pmt.nsf/1af5f59bae92986c85256bae000f898c/bbadb19d253f7df186257656002410c3!OpenDocument).