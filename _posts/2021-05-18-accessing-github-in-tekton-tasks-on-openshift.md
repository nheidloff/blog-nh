---
id: 4615
title: 'Accessing GitHub in Tekton Tasks on OpenShift'
date: '2021-05-18T07:33:05+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=4615'
permalink: /article/accessing-github-in-tekton-tasks-on-openshift/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/accessing-github-in-tekton-tasks-on-openshift/
categories:
    - Articles
---

This article explains how to access GitHub repositories from Tekton tasks on behalf of specific users via ssh.

In my [application modernization example](https://github.com/IBM/application-modernization-javaee-quarkus) I use Tekton pipelines to deploy the modernized cloud-native application. In order to access GitHub, you need to follow these four steps:

1. Key Creation
2. GitHub Configuration
3. Kubernetes Secret Creation
4. Usage in Tasks

**Key Creation**

First you need to create the public and private ssh keys.

```
$ ssh-keygen -t rsa -b 4096 -C "tekton@tekton.dev"
```

Enter the file name, for example ‘/Users/niklasheidloff/.ssh/tekton’ and define no password.

**GitHub Configuration**

The public key needs to be defined in your GitHub settings.

Get the public key via a command like this and copy the key to the clipboard:

```
$ cat /Users/niklasheidloff/.ssh/tekton.pub 
```

Open your GitHub settings https://github.com/settings/keys, create a new SSH key and paste it. Call the entry ‘tekton’.

**Kubernetes Secret Creation**

The private key needs to be put in a Kubernetes secret.

```
$ cat /Users/niklasheidloff/.ssh/tekton \| base64
$ export GITHUB_SSH_KEY_PRIVATE=your_private_key
```

This is a template yaml file for the secret:

```
apiVersion: v1
kind: Secret
metadata:
  name: git-ssh-key
  namespace: app-mod-argocd-pipelines
  annotations:
    tekton.dev/git-0: github.com
type: kubernetes.io/ssh-auth
data:
  ssh-privatekey: <base64data>
```

Next the resource in the yaml file needs to be applied.

```
$ sed "s/<base64data>/${GITHUB_SSH_KEY_PRIVATE}/g" ${ROOT_FOLDER}/scripts-openshift-argocd/argocd-config/tekton-git-ssh-secret.yaml.template > ${ROOT_FOLDER}/scripts-openshift-argocd/argocd-config/tekton-git-ssh-secret.yaml
$ oc apply -f ${ROOT_FOLDER}/scripts-openshift-argocd/argocd-config/tekton-git-ssh-secret.yaml
```

**Usage in Tasks**

Check out the sample tasks:

- [Read from GitHub](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift-argocd/tasks/git-checkout.yaml)
- [Write to GitHub](https://github.com/IBM/application-modernization-javaee-quarkus/blob/master/scripts-openshift-argocd/tasks/update-gitops-repo.yaml)

The following snippet shows how to write changes to GitHub. The trick is to use the two lines ‘eval …’ and ‘ssh-add …’ which refer to the private key in the secret. Read the Tekton [documentation](https://github.com/tektoncd/pipeline/blob/main/docs/auth.md#basic-authentication-git) for more details.

```
steps:
- name: commit-push-changes-gitops
    image: alpine/git:v2.30.2
    workingDir: "$(workspaces.config-source.path)"
    script: |
      #!/usr/bin/env sh
      set -e

      eval $(ssh-agent)
      ssh-add ~/.ssh/id_*

      git config --global user.email "tekton@tekton.dev"
      git config --global user.name "Tekton Pipeline"
      git add .
      git commit --allow-empty -m "[Tekton] updating $(params.environment)"
      git push origin main
```

Note: The working directory needs to be the root path, for example “$(workspaces.config-source.path)”. Other directories cause some weird behaviour and access issues.

**Next Steps**

To learn more about Tekton, ArgoCD and application modernization, check out my [repo](https://github.com/IBM/application-modernization-javaee-quarkus).