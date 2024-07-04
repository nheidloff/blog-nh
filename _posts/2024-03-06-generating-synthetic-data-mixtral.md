---
id: nh-067
title: 'Generating synthetic Data with Mixtral'
date: 2024-03-06 00:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-067'
permalink: /article/generating-synthetic-data-mixtral/
custom_permalink:
    - article/generating-synthetic-data-mixtral/
image: /assets/img/2024/03/prompt.png
---

*Fine-tuning and aligning language models to follow instructions requires high quality data and a large quantity of data. IBM published a paper that describes how synthetic data can be generated with Mixtral.*

The paper 'Large-scale Alignment for chatBots' covers a lot of great concepts to improve the [performance](https://huggingface.co/ibm/merlinite-7b#performance) of models like Mistral 7b and Llama 13b.

> LAB-trained models can achieve competitive performance across several benchmarks compared to models trained with traditional human-annotated or GPT-4 generated synthetic data. Thus offering a scalable, cost-effective solution for enhancing LLM capabilities and instruction-following behaviors without the drawbacks of catastrophic forgetting.

Mixtral is used as teacher to generate synthetic data to align smaller models. 

The following resources describe the concepts in more detail:

* Paper: [Large-scale Alignment for chatBots](https://arxiv.org/pdf/2403.01081.pdf)
* Model: [ibm/merlinite-7b](https://huggingface.co/ibm/merlinite-7b)
* Model: [ibm/labradorite-13b](https://huggingface.co/ibm/labradorite-13b)
* [Mixtral](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)

The paper defines four steps to generate data:

1. Instruction generation
2. Evaluating synthetic instruction
3. Generating responses
4. Evaluating the synthetic instruction-response pair

## Step 1: Question Generation

In the first step questions are generated. As example let's create questions to write informal emails. This is the prompt from the paper:

```text
You are asked to come up with a set of five diverse questions on writing informal emails.

Please follow these guiding principles when generating responses:

* Use proper grammar and punctuation.
* Always generate safe and respectful content. Do not generate content that is harmful, abusive, or offensive.
* Always generate content that is factually accurate and relevant to the prompt.
* The questions should be clear and human-like.
* The questions should be diverse and cover a wide range of topics.
* The questions should not be template-based or generic, it should be very diverse.
* Simply return the questions, do not return any answers or explanations.
* Strictly adhere to the prompt and generate responses in the same style and format as the example.

To better assist you with this task, here is an example:
### Question:
1. Write an informal email to a friend asking for advice on planning a surprise party.

Now generate five such questions, remember to follow the principles mentioned above and use the same format as the examples. Remember to use the same style and format as the example above. Return your responses in the format of [### Question [question number]: [question]]
```

Output from Mixtral:

```text
1. Write an informal email to a friend asking for recommendations on the best restaurants in town for a casual dinner.
2. Write an informal email to a friend asking for suggestions on the best outdoor activities to do in the area during the summer.
3. Write an informal email to a friend asking for recommendations on the best books to read for personal development.
4. Write an informal email to a friend asking for advice on how to improve time management skills.
5. Write an informal email to a friend asking for suggestions on the best podcasts to listen to for entertainment and education.
```

Since the five questions look good, I skip the second step 'Evaluating synthetic instruction'.

## Step 3: Answer Generation

To generate answers, only one of the questions is used as prompt:

```text
Write an informal email to a friend asking for advice on planning a surprise party.
```

The output of Mixtral is impressive.

```text
Subject: Help me plan a surprise party!

Hi [Friend's Name],

I hope you're doing well! I need your expertise in planning a surprise party. It's for our mutual friend [Name], who is turning [age] next month. I want it to be an unforgettable experience for her, and I could really use your help.

Firstly, do you think a surprise party at home or at a venue would be better? I was thinking of having it at her favorite restaurant, but I'm not sure if that would still be considered a surprise. What do you think?

Also, any ideas on how to get her to the venue without her suspecting anything? I was thinking of telling her that we're going out for dinner, but I'm worried she might want to change or something. Any suggestions?

Lastly, I need help with the decorations and food. Should we go with a theme? If so, what kind of theme would you suggest? And for the food, should we order from a caterer or cook ourselves?

I would really appreciate any advice you can give me. Let me know if you're free this weekend to discuss the details. I'll buy you a cup of coffee or a drink as a thank you!

Looking forward to hearing from you soon.

Best,
[Your Name]
```

## Step 4: Quality Assurance

To align or fine-tune models, the quality of the data is important. To filter out only the best question answer pairs, Mixtral is prompted to evaluate itself.

```text
Please act as an impartial judge and evaluate the quality of the answer provided by an AI assistant to the questions displayed below. Evaluate whether or not the answer is a good example of how AI Assistant should respond to the user’s instruction. Please assign a score using the following 3-point scale:

1: It means the answer is incorrect, irrelevant, unsafe or provides incomplete and garbage information. For instance, the answer may be factually wrong, off-topic, or filled with irrelevant content that doesn’t address the user’s question or it could be incomplete and hanging. It may also include any harmful, unethical, racist, sexist, explicit, offensive, toxic, dangerous, or illegal content.

2: It means the answer provides the correct answer, but it is brief and to the point without explanations. While it directly answers the user’s question, it lacks additional context or in-depth explanations. 

3: It means the answer is a perfect answer from an AI Assistant. It intentionally addresses the user’s question with a comprehensive and detailed explanation. It demonstrates expert knowledge in the area, is very well written, logical, easy to follow, engaging, and insightful. And the answer is safe and does not include any harmful content.

Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the answer on a scale of 1 to 3 as mentioned above. 

Question: Write an informal email to a friend asking for advice on planning a surprise party.

Answer: Subject: Help me plan a surprise party!

Hi [Friend's Name],

I hope you're doing well! I need your expertise in planning a surprise party. It's for our mutual friend [Name], who is turning [age] next month. I want it to be an unforgettable experience for her, and I could really use your help.

Firstly, do you think a surprise party at home or at a venue would be better? I was thinking of having it at her favorite restaurant, but I'm not sure if that would still be considered a surprise. What do you think?

Also, any ideas on how to get her to the venue without her suspecting anything? I was thinking of telling her that we're going out for dinner, but I'm worried she might want to change or something. Any suggestions?

Lastly, I need help with the decorations and food. Should we go with a theme? If so, what kind of theme would you suggest? And for the food, should we order from a caterer or cook ourselves?

I would really appreciate any advice you can give me. Let me know if you're free this weekend to discuss the details. I'll buy you a cup of coffee or a drink as a thank you!

Looking forward to hearing from you soon.

Best,
[Your Name]
```

As instructed Mixtral returns an explanation followed by a rating from 1 to 3 where 3 is the best rating.

```text
Explanation: The answer is a good example of how an AI assistant should respond to the user's instruction. The response is written in an informal and friendly tone, which is appropriate for an email to a friend. The AI assistant provides specific details about the surprise party, including the location, transportation, decorations, and food. The answer is also engaging and invites the friend to provide input and suggestions. However, the answer could have been improved by providing more detailed suggestions for the decorations, food, and transportation.

Score: 3
```

## Next Steps

To learn more, check out the [Watsonx.ai](https://eu-de.dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html?context=wx&audience=wdp) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.