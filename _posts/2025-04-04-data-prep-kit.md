---
id: nh-119
title: 'Unstructured Data Preparation for Generative AI'
date: 2025-04-04 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-119'
permalink: /article/data-prep-kit/
custom_permalink:
    - article/data-prep-kit/
image: /assets/img/2025/04/data-prep-kit.png
---

*IBM has open-sourced another great tool for Generative AI engineers and developers. With the Data Prep Kit data can be prepared for Fine-tuning and Retrieval Augmented Generation.*

[Data Prep Kit](https://github.com/data-prep-kit/data-prep-kit) is available on GitHub under Apache license:

> Data Prep Kit accelerates unstructured data preparation for LLM app developers. Developers can use Data Prep Kit to cleanse, transform, and enrich use case-specific unstructured data to pre-train LLMs, fine-tune LLMs, instruct-tune LLMs, or build retrieval augmented generation (RAG) applications for LLMs. Data Prep Kit can readily scale from a commodity laptop all the way to data center scale.

The modules in Data Prep Kit have been tested in producing pre-training datasets for the [Granite open source LLM models](https://huggingface.co/ibm-granite).

## Features

Data Prep Kit comes with a long list of transformers - see image at the top of this post: PDF and HTML to Parquet, dedup filter, PII filter, quality filter, HAP filter, chunking, and more. The data modalities supported today are natural language and code.

The modules are built on common frameworks for Python, Ray and Spark runtimes for scaling up data processing. You can run it locally on your desktop and to scale the process, you can leverage [Kubeflow Pipelines](https://www.kubeflow.org/docs/components/pipelines/overview/)-based workflow automation. Check out the [documentation](https://data-prep-kit.github.io/data-prep-kit/data-processing-lib/doc/ray-runtime/).

## Parquet

The first step is usually to convert unstructured data into the [Apache Parquet](https://parquet.apache.org/) format which is a column-oriented data file format designed for efficient data storage and retrieval. After this pipelines can be triggered to extend, annotate and filter data.

Here is an [example](http://localhost:8888/notebooks/notebooks/Run_your_first_transform_colab.ipynb) which converts a PDF file to Parquet:

```python
import urllib.request
import shutil
shutil.os.makedirs("tmp/input", exist_ok=True)
urllib.request.urlretrieve("https://raw.githubusercontent.com/data-prep-kit/data-prep-kit/dev/transforms/language/pdf2parquet/test-data/input/redp5110-ch1.pdf", "tmp/input/redp5110-ch1.pdf")
from dpk_pdf2parquet.transform_python import Pdf2Parquet
from dpk_pdf2parquet.transform import pdf2parquet_contents_types

Pdf2Parquet(input_folder= "tmp/input", 
    output_folder= "tmp/output", 
    data_files_to_use=['.pdf', '.zip'],
    pdf2parquet_contents_type=pdf2parquet_contents_types.JSON).transform()

import pyarrow.parquet as pq
import pandas as pd
table = pq.read_table('tmp/output/redp5110-ch1.parquet')
pandas = table.to_pandas()
pandas
print (pandas[pandas['filename'] == 'redp5110-ch1.pdf'].iloc[0,]['contents'])
```

The resulting table contains columns like filename, contents, num_pages, num_tables, document_id, document_hash etc.

The 'contents' column contains the [Docling](https://docling-project.github.io/docling/concepts/docling_document/) JSON format. Alternatively, markdown can be returned.

```json
{
    "schema_name": "DoclingDocument",
    "version": "1.0.0",
    "name": "redp5110-ch1",
    "origin": {
        "mimetype": "application\/pdf",
        "binary_hash": 74198560999363607,
        "filename": "redp5110-ch1.pdf"
    },
    "body": {
        "self_ref": "#\/body",
    ...
```

## Examples

The repo comes with several examples which demonstrate how to prepare data for fine-tuning and RAG:

* [Conversion of PDF to Parquet, De-duplication of Data, Document Chunking, Encoding](https://github.com/data-prep-kit/data-prep-kit/blob/dev/examples/notebooks/rag-pdf-1/rag_1_dpk_process_python.ipynb)
* [Identification of Personally Identifiable Information (PII)](https://github.com/data-prep-kit/data-prep-kit/blob/dev/examples/notebooks/PII/Run_your_first_PII_redactor_transform.ipynb)
* [Identification of Hate, Abuse and Profanity (HAP)](https://github.com/data-prep-kit/data-prep-kit/blob/dev/examples/notebooks/hap/generate_hap_score_csv.ipynb)
* [Conversion of PDF to Parquet, Document Quality Assessment, Tokenization of the Data](https://github.com/data-prep-kit/data-prep-kit/blob/dev/examples/notebooks/fine%20tuning/language/fine-tune-language.ipynb)
* [Programming Language Selection, Code Quality Annotations, Filtering, Semantic Ordering](https://github.com/data-prep-kit/data-prep-kit/blob/dev/examples/notebooks/fine%20tuning/code/sample-notebook.ipynb)

One feature I'd like to call out is the [Chunk Documents Transformer](https://data-prep-kit.github.io/data-prep-kit/transforms/language/doc_chunk/). When chunking documents the structure of documents is considered to avoid information loss.

> When using documents converted to JSON, the transform leverages the Docling Core HierarchicalChunker to chunk according to the document layout segmentation, i.e. respecting the original document components as paragraphs, tables, enumerations, etc.

## Next Steps

Check out the [Data Prep Kit Documentation](https://data-prep-kit.github.io/data-prep-kit/data-processing-lib/doc/overview/) and run the examples locally using notebooks.