---
id: nh-123
title: 'Deploying Docling on watsonx.ai'
date: 2025-04-16 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-123'
permalink: /article/docling-serve/
custom_permalink:
    - article/docling-serve/
image: /assets/img/2025/04/docling-serve-00.png
---

*Docling is a popular open-source project contributed by IBM. It supports easy and fast parsing of PDFs and several other file types including images. Docling can be run via containers and deployed to Kubernetes, OpenShift and watsonx.ai.*

Here are the high-level features from the [Docling](https://github.com/DS4SD/docling) repo:

* Reads popular document formats (PDF, DOCX, PPTX, XLSX, Images, HTML, AsciiDoc & Markdown) and exports to HTML, Markdown and JSON (with embedded and referenced images)
* Advanced PDF document understanding including page layout, reading order & table structures
* Unified, expressive DoclingDocument representation format
* Easy integration with LlamaIndex & LangChain for powerful RAG / QA applications
* OCR support for scanned PDFs

[Docling Serve](https://github.com/docling-project/docling-serve) allows running Doclink as a container and deployments to Kubernetes-based systems. Deployments of Docling as a service on Kubernetes-based systems increase the deployment complexity and increase network utilization. However, these types of deployments allow re-use from various projects and better scalability.

## Container

There are images that contain the full Doclink functionality including various models.

```bash
podman run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

Swagger UI:

![image](/assets/img/2025/04/docling-serve-03.png)

Additionally, there is a better user interface under the path '/ui'. The screenshot at the top of this post shows the input parameters and the next screenshot shows the output:

![image](/assets/img/2025/04/docling-serve-01.png)

## Deployment

[Deployments](https://github.com/docling-project/docling-serve/blob/main/docs/deployment.md) to watsonx.ai can be done via the following commands:

```bash
oc login ...
oc new-project doclink-serve
git clone https://github.com/docling-project/docling-serve.git
cd doclink-serve
NAMESPACE=doclink-serve
kubectl apply -f docs/deploy-examples/docling-serve-oauth.yaml

DOCLING_NAME=docling-serve
DOCLING_ROUTE="https://$(oc get routes ${DOCLING_NAME} --template={{.spec.host}})"
OCP_AUTH_TOKEN=$(oc whoami --show-token)
curl -X 'POST' \
  "${DOCLING_ROUTE}/v1alpha/convert/source/async" \
  -H "Authorization: Bearer ${OCP_AUTH_TOKEN}" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "http_sources": [{"url": "https://arxiv.org/pdf/2501.17887"}]
  }'
```

After the deployment the resources are displayed in the OpenShift console.

![image](/assets/img/2025/04/docling-serve-02.png)

## Configuration

For production scenarios doclink-serve can be configured. The API allows programmatic access to all features.

* [CPU and GPU](https://github.com/docling-project/docling-serve?tab=readme-ov-file#container-images)
* [Server Configuration](https://github.com/docling-project/docling-serve/blob/main/docs/configuration.md)
* [API Usage](https://github.com/docling-project/docling-serve/blob/main/docs/usage.md)

## Next Steps

Here are some resources:

* [SmolDocling: Vision-Language Model for Document Conversion]({{ "/article/smoldocling/" | relative_url }})
* [Open Source Document Parser including OCR]({{ "/article/document-parser-ocr-docling/" | relative_url }})
* [Docling Repo](https://github.com/docling-project/docling)
* [Paper](https://lnkd.in/dxjVg-Zs)
* [SmolDocling : Streamlined OCR Document Conversion and Lightweight Understanding](https://www.geeky-gadgets.com/smoldocling-ocr-tool/)
* [IBM and Hugging Face Researchers Release SmolDocling: A 256M Open-Source Vision Language Model for Complete Document OCR](https://www.marktechpost.com/2025/03/18/ibm-and-hugging-face-researchers-release-smoldocling-a-256m-open-source-vision-language-model-for-complete-document-ocr/)

To learn more, check out the [Watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service) documentation and the [Watsonx.ai](https://www.ibm.com/products/watsonx-ai) landing page.