---
id: nh-100
title: 'Open Source Document Parser including OCR'
date: 2024-12-18 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-100'
permalink: /article/document-parser-ocr-docling/
custom_permalink:
    - article/document-parser-ocr-docling/
image: /assets/img/2024/12/docling1.png
---

*Docling is a popular open-source project contributed by IBM. It supports easy and fast parsing of PDFs and several other file types including images. This post gives a quick introduction to Docling.*

Here are the high-level features from the [Docling](https://github.com/DS4SD/docling) repo:

* Reads popular document formats (PDF, DOCX, PPTX, XLSX, Images, HTML, AsciiDoc & Markdown) and exports to HTML, Markdown and JSON (with embedded and referenced images)
* Advanced PDF document understanding including page layout, reading order & table structures
* Unified, expressive DoclingDocument representation format
* Easy integration with LlamaIndex & LangChain for powerful RAG / QA applications
* OCR support for scanned PDFs
* Simple and convenient CLI

## Setup

The setup is very easy.

```bash
python3 -m venv venv
source venv/bin/activate
pip install docling

docling https://arxiv.org/pdf/2206.01062 --ocr --to json  
```

The models are automatically downloaded from [HuggingFace](
https://huggingface.co/ds4sd/docling-models) and are relatively small. You can run them on GPUs or CPUs.

## OCR

As pdf backends pypdfium2, dlparse_v1 and dlparse_v2 are integrated. For OCR (Optical Character Recognition) EasyOCR, Tesseract, RapidOCR and Mac OCR can be utilized. The following screenshot shows how an image can be put as encoding in a markdown file and how text information is extracted to JSON.

![image](/assets/img/2024/12/docling3.png)

There is also an API to read the [document structures](https://ds4sd.github.io/docling/v2/#access-document-structures).

## Tables

Tables can be read as well including tables that span pages.

![image](/assets/img/2024/12/docling2.png)

## Next Steps

The repo mentions some other forthcoming features like code and equation extractions. Check out the [documentation](https://ds4sd.github.io/docling/) to learn more.