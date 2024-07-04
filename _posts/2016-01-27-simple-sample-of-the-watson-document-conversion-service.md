---
id: 1810
title: 'Simple Sample of the Watson Document Conversion Service'
date: '2016-01-27T14:33:32+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=1810'
permalink: /article/watson-document-conversion-sample/
accesspresslite_sidebar_layout:
    - right-sidebar
dsq_thread_id:
    - '4527862934'
custom_permalink:
    - article/watson-document-conversion-sample/
categories:
    - Articles
---

With the [Watson Document Conversion](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/document-conversion.html) service on [Bluemix](https://bluemix.net) PDF, Word and HTML documents can be converted into HTML, plain text or JSON. The converted documents can be used as input to other Watson services like [Concept Insights]({{ "/article/watson-concept-insights-sample-eclipse-faq" | relative_url }}) and [Retrieve and Rank]({{ "/article/sample-watson-retrieve-and-rank-service-bluemix" | relative_url }}).

In my [concept insights sample](https://github.com/IBM-Bluemix/concept-insights-eclipse-faq) I’ve used the service to convert the downloaded HTML files into JSON. From the JSON the title and body fields were extracted and uploaded to the concept insights service. Check out the Python script [convert.py](https://github.com/IBM-Bluemix/concept-insights-eclipse-faq/blob/master/convert.py) file to see how to invoke the service via curl for multiple files. Here is the key part.

```
curl_cmd = 'curl -k -s %s -u %s -F "config={\\"conversion_target\\":\\"ANSWER_UNITS\\"}" -F "file=@%s" "%s"' % (VERBOSE, DOCCNV_CREDS, htmlfilename, DOCCNV_CNVURL)
process = subprocess.Popen(shlex.split(curl_cmd), stdout=subprocess.PIPE)
output = process.communicate()[0]
```

Check out the [API explorer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/document-conversion/api/v1/#convert-document) for samples how to invoke the service from the command line and from Java, Node and Python. There are also various [customization](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/document-conversion/customizing.shtml) options.

Here is a sample of the [online demo](https://document-conversion-demo.mybluemix.net/).

![image](/assets/img/2016/01/watdoccon.png)