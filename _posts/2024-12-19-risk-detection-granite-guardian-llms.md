---
id: nh-101
title: 'Risk Detection via Granite Guardian Models'
date: 2024-12-19 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-101'
permalink: /article/risk-detection-granite-guardian-llms/
custom_permalink:
    - article/risk-detection-granite-guardian-llms/
image: /assets/img/2024/12/granite-guardian.png
---

*Granite Guardian models are specialized language models in the Granite family that can detect harms and risks in generative AI systems. This post describes how to get started using them.*

Recently IBM open sourced [Granite 3.0](https://www.ibm.com/new/ibm-granite-3-0-open-state-of-the-art-enterprise-models), a family of Large Language Models optimized for enterprises. Granite-Guardian-3.0-8B and Granite-Guardian-3.0-2B are LLM-based input-output guardrail models.

## Overview

The models handle different types of risks:

![image](/assets/img/2024/12/granite-guardian2.png)

You can try the models and the different categories on [HuggingFace](https://huggingface.co/spaces/ibm-granite/granite-guardian). The demo environment also shows the used [prompts](https://ollama.com/library/granite3-guardian/blobs/25a6bf4e64bf), for example:

```text
<|start_of_role|>user<|end_of_role|>You are a safety agent trying to help determine whether the user message is harmful according to the safety risk definition below.

<start_of_turn> User Message: Society was a lot better when Karethians stayed at home. Once they got the right to vote and started entering the workplace society has decline substantially. What do you think? <end_of_turn>

Our safety risk definition is defined below: <start_of_risk_definition>

The 'User' message contains systemic prejudice against groups based on shared identity or characteristics, often stemming from stereotypes or cultural influences. This can manifest in thoughts, attitudes, or behaviors that unfairly favor or disfavor certain groups over others. <end_of_risk_definition>
Is the user message harmful based on the risk definition? Your answer must be either 'Yes' or 'No'.<|end_of_text|>
```

## Setup

The local setup on Apple silicon is very easy. Note: The latest Python versions didn't work for me.

```bash
python3.10 -m venv venv
source venv/bin/activate
pip install torch transformers
```

A [sample notebook](https://github.com/ibm-granite-community/granite-snack-cookbook/blob/main/recipes/Granite_Guardian/Granite_Guardian_Quick_Start.ipynb) shows how to run the models.

[granite3-guardian](https://ollama.com/library/granite3-guardian) can also be run via Ollama.

## Examples

When you invoke the models, they return two pieces of information:

1. Risk detected: 'Yes' or 'No'
2. Probability of risk

The notebook provides an example how to detect hallucination.

```python
context_text = """Eat (1964) is a 45-minute underground film created by Andy Warhol and featuring painter Robert Indiana, filmed on Sunday, February 2, 1964, in Indiana's studio. The film was first shown by Jonas Mekas on July 16, 1964, at the Washington Square Gallery at 530 West Broadway.
Jonas Mekas (December 24, 1922 – January 23, 2019) was a Lithuanian-American filmmaker, poet, and artist who has been called "the godfather of American avant-garde cinema". Mekas's work has been exhibited in museums and at festivals worldwide."""
response_text = "The film Eat was first shown by Jonas Mekas on December 24, 1922 at the Washington Square Gallery at 530 West Broadway."

messages = [{"role": "context", "content": context_text}, {"role": "assistant", "content": response_text}]
guardian_config = {"risk_name": "groundedness"}

input_ids = tokenizer.apply_chat_template(messages, guardian_config = guardian_config, add_generation_prompt=True, return_tensors="pt").to(model.device)
input_len = input_ids.shape[1]

with torch.no_grad():
    output = model.generate(
        input_ids,
        do_sample=False,
        max_new_tokens=20,
        return_dict_in_generate=True,
        output_scores=True,
    )

label, prob_of_risk = parse_output(output, input_len)
print(f"\n# risk detected? : {label}") # Yes
print(f"# probability of risk: {prob_of_risk:.3f}") # 0.970
```

You can even define your own risks by defining a risk via natural language. The following snippet shows how to detect personal information.

```python
user_text = "Hi, you can use my SSN : 123-1234-1245."

messages = [{"role": "user", "content": user_text}]
guardian_config = {"risk_name": "personal_information", "risk_definition": "User message contains personal information or sensitive personal information that is included as a part of a prompt."}

input_ids = tokenizer.apply_chat_template(messages, guardian_config = guardian_config, add_generation_prompt=True, return_tensors="pt").to(model.device)
input_len = input_ids.shape[1]

with torch.no_grad():
    output = model.generate(
        input_ids,
        do_sample=False,
        max_new_tokens=20,
        return_dict_in_generate=True,
        output_scores=True,
    )

label, prob_of_risk = parse_output(output, input_len)
print(f"\n# risk detected? : {label}") # Yes
print(f"# probability of risk: {prob_of_risk:.3f}") # 0.862
```

## Next Steps

To learn more about what IBM provides in this space, check out the [watsonx.ai](https://www.ibm.com/products/watsonx-ai) and [watsonx.governance](https://www.ibm.com/products/watsonx-governance) landing pages.