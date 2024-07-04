---
id: nh-039
title: 'Python and PyTorch for AI Engineers'
date: 2023-09-05 11:07:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-039'
permalink: /article/python-pytorch/
custom_permalink:
    - article/python-pytorch/
image: /assets/img/2023/09/python-pytorch.png
---

*IT professionals who want to become AI engineers need to learn new technologies. This post summarizes the languages and frameworks that I've started to look into recently.*

As a developer I've learned several languages, frameworks, and libraries. When starting to gain an understanding of new technologies, sometimes it can be overwhelming since many skills need to be acquired at the same time. This can lead to a typical behavior of trying to take shortcuts, for example, by utilizing known techniques rather than learning the ones established in the community. While this might work in the short-term, you need to upskill eventually for multiple reasons:

* When working with other AI engineers, using the same languages and tools makes the team more efficient.
* The latest and greatest functionality is available in standard formats first before they might be converted for other frameworks.
* When searching for help, you'll find the best information in the standard formats used by the community.

## Python

Python is the de-facto standard language for everything related to AI. Here are some of the main [concepts](https://www.python.org/doc/essays/blurb/):

* Easy to learn
* Attractive for Rapid Application Development
* Specializes on handling data structures
* Emphasizes readability via short code

The following [snippet](https://www.python.org/) demonstrates how easy it is to define compound datatypes and how to loop through them. 

```python
>>> fruits = ['Banana', 'Apple', 'Lime']
>>> loud_fruits = [fruit.upper() for fruit in fruits]
>>> print(loud_fruits)
['BANANA', 'APPLE', 'LIME']

>>> list(enumerate(fruits))
[(0, 'Banana'), (1, 'Apple'), (2, 'Lime')]

>>> numbers = [2, 4, 6, 8]
>>> product = 1
>>> for number in numbers:
       product = product * number
>>> print('The product is:', product)
The product is: 384
```

There is also a huge set of additional libraries. Some of them are standard libraries every Python developer knows, for instance, [NumPy](https://numpy.org/) and [pandas](https://pandas.pydata.org/).

## PyTorch

PyTorch and TensorFlow are the standard deep learning frameworks. PyTorch was created by Meta, TensorFlow by Google.

Here is the description of [PyTorch](https://pytorch.org/features/).

> PyTorch enables fast, flexible experimentation and efficient production through a user-friendly front-end, distributed training, and ecosystem of tools and libraries.

With PyTorch models, for example transformers, can be developed and compiled to static representations.

```python
import torch
  class MyModule(torch.nn.Module):

    def __init__(self, N, M):
      super(MyModule, self).__init__()
      self.weight = torch.nn.Parameter(torch.rand(N, M))

    def forward(self, input):
      if input.sum() > 0:
        output = self.weight.mv(input)
      else:
        output = self.weight + input
      return output

    # Compile the model code to a static representation
    my_script_module = torch.jit.script(MyModule(3, 4))

    # Save the compiled code and model data so it can be loaded elsewhere
    my_script_module.save("my_script_module.pt")
```

TensorFlow is another great framework with advantages like mobile support. Personally I prefer PyTorch for two reasons:

1. There are [120399](https://huggingface.co/models?library=pytorch,transformers&sort=downloads) transformer based models implemented with PyTorch on Hugging Face compared to [9465](https://huggingface.co/models?library=transformers,tf&sort=downloads) with TensorFlow.
2. While both frameworks are open source, it feels like PyTorch is 'more open' in terms of governance.

Originally PyTorch was primarily used by researchers only, but this seems to have changed over the last months/years.

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.