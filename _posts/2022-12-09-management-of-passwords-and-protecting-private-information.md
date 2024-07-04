---
id: 5551
title: 'Management of Passwords and protecting private Information'
date: '2022-12-09T00:45:56+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=5551'
permalink: /article/management-of-passwords-and-protecting-private-information/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/management-of-passwords-and-protecting-private-information/
categories:
    - Articles
---

*My family uses several Apple devices, since we like the user experience. However, there is one thing we don’t like. Even if you turn off iCloud, it keeps getting enabled again. This post describes how we protect our data.*

I don’t understand why and when iCloud is re-enabled by Apple. I assume that they enable it sometimes automatically when updates are installed. It doesn’t happen all the time, but it has happened too many times to be an issue in Apple’s software.

There is certain data that I don’t want to share with Apple or any company, for example passwords, bank account information and private encryption keys. Over the last years there has been a debate about what Apple wants to protect and what they are allowed to protect. It sounds like with the new ‘Advanced Data Protection’ plan Apple wants to address some of this for the US in early 2023. However, at this point if you store confidential information in ‘Pages’, it is not end-to-end protected which means that technically other organizations can get access to it.

This is why I have created a family account at [1Password](https://1password.com/). It’s a Canadian company which provides end-to-end encryption. Only you can access your data, not even 1Password. You get a longer key (emergency kit) and you define a password. If you loose this information, all data in your vault is lost. As mentioned on the home page of 1Password, IBM is a client. I might be biased since I work for IBM, but if this is good enough for IBM, it’s also good enough for me.

With this one password all your passwords can be entered easily. The passwords are not stored in browsers and they are not stored by Apple. They can be accessed from different operation systems like MacOS, iOS, Windows, etc.

Additionally 1Password doesn’t only work for passwords, but also for notes and files.

Let’s take a look how this works.

After you’ve created an account, you need to log in with your password. This works for the browser extension as well as the native applications (e.g. via finger print).

![image](/assets/img/2022/12/1pw1.png)

When you log in to a new site, you get the option to store your password in 1Password.

![image](/assets/img/2022/12/1pw3.png)

![image](/assets/img/2022/12/1pw4.png)

If passwords are stored in 1Password, you can choose your password directly in the browser.

![image](/assets/img/2022/12/1pw5.png)

Alternatively you can log in via the native application.

![image](/assets/img/2022/12/1pw6.png)

In the native application you can find and manage your logins. For example you see whether passwords are too weak or whether two factor authentication should be enabled.

![image](/assets/img/2022/12/1pw7.png)

In addition to passwords you can store text files as well.

![image](/assets/img/2022/12/1pw8.png)

You can also store files, for example private encryption keys.

![image](/assets/img/2022/12/1pw9.png)