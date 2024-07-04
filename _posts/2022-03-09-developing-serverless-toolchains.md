---
id: 4766
title: 'Developing Serverless Toolchains'
date: '2022-03-09T17:49:53+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4766'
permalink: /article/developing-serverless-toolchains/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/developing-serverless-toolchains/
categories:
    - Articles
---

*Previously I blogged about how to deploy serverless SaaS with serverless toolchains. In this article I explain some details how I’ve implemented the toolchain.*

With the serverless toolchain of our SaaS reference architecture cloud-native applications are deployed to IBM’s serverless offering IBM Cloud Code Engine for multiple tenants. Please read my previous blog [Deploying Serverless SaaS with Serverless Toolchains]({{ "/article/deploying-serverless-saas-with-serverless-toolchains/" | relative_url }}) for details.

You can find the implementation of the toolchain in the [IBM/multi-tenancy-serverless-ci-cd](https://github.com/IBM/multi-tenancy-serverless-ci-cd) repo.

**One Click Setup**

One really nice capability is that the full toolchain with all pipelines can be set up with very few clicks using a web experience.

- Link to your forked repos of the reference architecture
- Create an IBM Cloud API key
- Define region and resource group

![image](/assets/img/2022/03/serverless-cicd1.png)

IBM Toolchains come with a template mechanism that allows to create these types of web user interfaces without having to write code. Check out the .bluemix directory and specifically the [form-schema.json](https://github.com/IBM/multi-tenancy-serverless-ci-cd/blob/main/.bluemix/form-schema.json) file how to do UI customization. [Toolchain.yml](https://github.com/IBM/multi-tenancy-serverless-ci-cd/blob/main/.bluemix/toolchain.yml) contains the overall definition of the toolchain, for example the used repos and links to the four pipelines.

**Triggering Pipelines from other Pipelines**

The actual development of the pipelines is done with Tekton. You can find all assets in the ./tekton directory. There are a lot of reusable assets in there which might be of interest for you.

- Building and pushing images to IBM Container Registry
- Passing parameters between different Tekton artifacts
- Reading configuration from external JSON files
- Accessing IBM Cloud API keys and logging in

The biggest challenge was to figure out how to [trigger pipelines from other pipelines](https://github.com/IBM/multi-tenancy-serverless-ci-cd/blob/main/.tekton/tasks/trigger-tenant-pipelines-backend.yml). The trick is to use ‘ibmcloud dev toolchain-get’ to get the other pipeline ids and then to trigger them via ‘ibmcloud dev tekton-trigger’ and to pass the tenant id as trigger parameter.

```
cat /cd-config/toolchain.json
export TOOLCHAIN_NAME=$(jq -r '.name' /cd-config/toolchain.json)
echo $TOOLCHAIN_NAME        
ALMOST_OTHER_PIPELINE_ID=$(ibmcloud dev toolchain-get $TOOLCHAIN_NAME | grep "pipeline-backend-tenant" -A 1 | grep -v "pipeline-backend-tenant")
OTHER_PIPELINE_ID=$(echo $ALMOST_OTHER_PIPELINE_ID | cut -c5-40)
echo $OTHER_PIPELINE_ID
CONFIG_FILES="configuration/tenants/*"
for file in $CONFIG_FILES
do
  CONFIG_FILE=$file
  TENANT_ID_JSON=$(echo $CONFIG_FILE | cut -c23-)
  TENANT_ID=$(echo $TENANT_ID_JSON | cut -d. -f1)
  ibmcloud dev tekton-trigger $OTHER_PIPELINE_ID --trigger-name $TENANT_ID
done
```

In the [triggered](https://github.com/IBM/multi-tenancy-serverless-ci-cd/blob/main/.tekton/tasks/read-tenant-config.yml) pipeline the trigger can be read via environment variable.

```
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: read-tenant-config
spec:
  workspaces:
    - name: workspace-tenant 
  stepTemplate:
    env:
      - name: TRIGGER_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.annotations['devops.cloud.ibm.com/trigger-name']
```

**Deloying to Code Engine**

The following [snippets](https://github.com/IBM/multi-tenancy-serverless-ci-cd/blob/main/.tekton/tasks/deploy-backend.yml) show how to create secrets in Code Engine, how to configure access to the container registry and how to deploy containers.

```
ibmcloud ce secret update --name appid.oauthserverurl --from-literal "APPID_AUTH_SERVER_URL=$APPID_OAUTHSERVERURL"
...
ibmcloud ce registry update \
  --name $(params.REGISTRY_SECRET_NAME) \
  --server $(params.REGISTRY_URL) \
  --username "iamapikey" \
  --password $API_KEY \
  --email "multi-tenancy@example.com"
...  
ACTION="create"
CHECK=$(ibmcloud ce application get --name $(params.APPLICATION_CONTAINER_NAME_BACKEND) | awk '/Name:/ {print $2}')
if [[ $CHECK == $(params.APPLICATION_CONTAINER_NAME_BACKEND)* ]]
then
  echo "Application already exists"
  ACTION="update"
fi
IMAGE_NAME_BACKEND="$(params.REGISTRY_URL)"/"$(params.REGISTRY_NAMESPACE)"/"$(params.IMAGES_NAME_BACKEND)":"$(params.REGISTRY_TAG)"
ibmcloud ce application $ACTION --name $(params.APPLICATION_CONTAINER_NAME_BACKEND) \
  --image $IMAGE_NAME_BACKEND \
  --env-from-secret postgres.certificate-data \
  --env-from-secret postgres.username \
  --cpu "1" \
  --memory "2G" \
  --port 8081 \
  --registry-secret "$(params.REGISTRY_SECRET_NAME)" \
  --max-scale 1 \
  --min-scale 1 
```

To learn more about the reference architecture, check out these resources.

- [New Open-Source Multi-Cloud Asset to build SaaS]({{ "/article/open-source-multi-cloud-assets-saas" | relative_url }})
- [How to build SaaS for multiple Tenants]({{ "/article/how-to-build-saas-for-multiple-tenants/" | relative_url }})
- [Typical Authentication Flow for Kubernetes Applications]({{ "/article/typical-authentication-flow-kubernetes-applications/" | relative_url }})
- [Initial Setup of the Serverless Application](https://ibm.github.io/multi-tenancy-documentation/serverless-via-ibm-code-engine/ce-setup-create-the-instances/)
- [Multi Tenancy Repo](https://github.com/IBM/multi-tenancy)