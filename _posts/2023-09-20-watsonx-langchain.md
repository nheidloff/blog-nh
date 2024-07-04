---
id: nh-050
title: 'Accessing Watsonx Models from LangChain'
date: 2023-09-20 01:19:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-050'
permalink: /article/watsonx-langchain/
custom_permalink:
    - article/watsonx-langchain/
image: /assets/img/2023/09/langchain-watsonx.png
---

*LangChain allows chaining and orchestrating LLMs tasks for scenarios like Retrieval Augmented Generation and agents. Below is a snippet that shows how Watsonx.ai models can be accessed in LangChain.*

## LangChain

[LangChain](https://www.langchain.com/) is a nice framework to build context-aware, reasoning applications. [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) is IBM's next generation enterprise studio for AI builders to train, validate, tune and deploy AI models including foundation models.

Let's look how Watsonx.ai models can be integrated in LangChain.

## Watsonx.ai Python Library

Watsonx.ai provides a [Python library](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-python-lib.html?context=wx&audience=wdp). First install and import the modules.

```python
!pip install langchain
!pip install ibm-watson-machine-learning

import os
from dotenv import load_dotenv
from typing import Any, List, Mapping, Optional, Union, Dict
from pydantic import BaseModel, Extra
from langchain import PromptTemplate
from langchain.chains import LLMChain, SimpleSequentialChain
from langchain.llms.base import LLM
from langchain.llms.utils import enforce_stop_tokens
from ibm_watson_machine_learning.foundation_models import Model
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
```

## Watsonx LangChain Wrapper

Next wrap the Watsonx model in a langchain.llms.base.LLM subclass to allow LangChain to interact with the model.

```python
load_dotenv()
project_id = os.getenv("PROJECT_ID", None)
creds = {
    "url": "https://us-south.ml.cloud.ibm.com",
    "apikey": os.getenv("API_KEY", None)
}

class WatsonxLLM(LLM, BaseModel):
    credentials: Optional[Dict] = None
    model: Optional[str] = None
    params: Optional[Dict] = None
    project_id : Optional[str]=None

    class Config:
        extra = Extra.forbid

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        _params = self.params or {}
        return {
            **{"model": self.model},
            **{"params": _params},
        }
    
    @property
    def _llm_type(self) -> str:
        return "IBM WATSONX"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        params = self.params or {}
        model = Model(model_id=self.model, params=params, credentials=self.credentials, project_id=self.project_id)
        text = model.generate_text(prompt)
        if stop is not None:
            text = enforce_stop_tokens(text, stop)
        return text
```

## Inferences

In the simplest case the model can be invoked directly.

```python
params = {
    GenParams.DECODING_METHOD: "greedy",
    GenParams.MIN_NEW_TOKENS: 1,
    GenParams.MAX_NEW_TOKENS: 256
}
model = WatsonxLLM(model="google/flan-t5-xxl", credentials=creds, params=params, project_id=project_id)
text = "Where is Germany?"
model(text)
```

```text
'continent of Europe'
```

The following snippet shows how to leverage LangChain to let one model ask a question and a second model to answer the question.

```python
params = {
    GenParams.DECODING_METHOD: "sample",
    GenParams.MIN_NEW_TOKENS: 1,
    GenParams.MAX_NEW_TOKENS: 100,
    GenParams.RANDOM_SEED: 42,
    GenParams.TEMPERATURE: 0.8,
    GenParams.TOP_K: 10,
    GenParams.TOP_P:1
}
prompt1 = PromptTemplate(
    input_variables=["topic"], 
    template="Generate a random question about {topic}: Question: ")
prompt2 = PromptTemplate(
    input_variables=["question"],
    template="Answer the following question: {question}",
)
model1 = WatsonxLLM(model="google/flan-t5-xxl", credentials=creds, params=params, project_id=project_id)
model2 = WatsonxLLM(model="google/flan-t5-xxl", credentials=creds, project_id=project_id)
llm_chain1 = LLMChain(llm=model1, prompt=prompt1)
llm_chain2 = LLMChain(llm=model2, prompt=prompt2)
question_answer = SimpleSequentialChain(chains=[llm_chain1, llm_chain2], verbose=True)
question_answer.run("USA")
```

```text
> Entering new SimpleSequentialChain chain...
What is the name of the largest city in the United States?
us ny
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.