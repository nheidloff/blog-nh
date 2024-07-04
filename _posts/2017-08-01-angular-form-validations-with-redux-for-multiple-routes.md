---
id: 2449
title: 'Angular Form Validations with Redux for multiple Routes'
date: '2017-08-01T08:43:06+00:00'
author: 'Niklas Heidloff'
layout: post
guid: 'http://heidloff.net/?p=2449'
permalink: /article/angular-2-form-redux-multiple-routes/
accesspresslite_sidebar_layout:
    - right-sidebar
custom_permalink:
    - article/angular-2-form-redux-multiple-routes/
dsq_thread_id:
    - '6032441359'
categories:
    - Articles
---

Many frontend applications require the extensive use of forms to allow users entering information. [Angular](https://angular.io/) supports various mechanisms to handle forms, but I’ve struggled to figure out how to handle validations of data on different pages/routes. Below is a pattern I’ve used based on [Redux](https://github.com/angular-redux/store) which doesn’t leverage much of the Angular forms functionality but works very nicely for me.

Initially I thought that my requirements would be pretty straight forward and common for single-page applications. However there were two things which I didn’t manage to address with core Angular forms functionality.

- Display validation errors for multiple forms on different pages (pages from an user experience perspective; technically routes) including for forms that are not currently visible. In my case I had a sidebar component with validation errors which was displayed on every page.
- Display validation errors for forms that have not been loaded yet. This was necessary since I read an initial set of data which was used to pre-populate forms.

Angular supports two types of forms handling – [template driven forms](https://angular.io/guide/forms) and [reactive forms](https://angular.io/guide/reactive-forms). Since the reactive forms provide more flexibility I started to use them. My hope was to somehow utilize the router to load all pages without showing them to trigger the out of the box form validations. Unfortunately I didn’t get this to work without a lot of flickering and weird behavior in the user interface.

A separate issue I had was refreshing of components. Read my older blog entry [My Advice: Don’t use Angular 2+ without Redux]({{ "/article/angular-2-redux" | relative_url }}) for details. Because of the refresh issues and the form validation issues I decided to do a bigger refactoring of my code to use [Redux](http://redux.js.org/).

I have [open sourced](https://github.com/nheidloff/conversation-inspector-for-ibm-watson) an application which demonstrates how Redux helps to validate data for forms before forms have been loaded. The following screenshot shows an validation error of the password field and in the right column the Redux Chrome extension which displays state information.

![image](/assets/img/2017/08/angular-redux-forms.png)

Here is an overview of how this has been implemented. Let’s start with the [HTML](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/src/app/configuration.component.html) for the password field.

{% highlight html %}
{% raw %}
<input [value]="watsonPassword$ | async" (blur)="onBlurWatsonPassword($event)" (keyup)="onKeyUpWatsonPassword($event)" class="form-control" id="watsonPassword" />
<div *ngIf="(validationErrorsPassword$ | async)?.length > 0" class="alert alert-warning">
    {{ (validationErrorsPassword$ | async)[0].displayText }}
</div>
{% endraw %}
{% endhighlight %}

In the component’s [Typescript](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/src/app/configuration.component.ts) file observables are used for the value of the password field and the validation errors. With the “xxx$ | async” notation above the values are displayed in the user interface when they change.

```
@select(['tool', 'watsonPassword']) watsonPassword$: Observable<boolean>;
validationErrorsPassword$: Observable<ValidationError[]>;

ngOnInit(): void {
   this.skillOverviewForm = this.formBuilder.group({});
   ...
   this.validationErrorsPassword$ = this.ngRedux.select((state) => {
      let errors: ValidationError[] = [];
      state.tool.validationErrors.forEach((validationError) => {
         if (validationError.itemName == 'watsonPassword') errors.push(validationError);
      });
      return errors;
   });
   ...	
}

onKeyUpWatsonPassword(event) {
   let value: string;
   let element: any;
   element = document.getElementById('watsonPassword');
   if (element) {
      value = element.value;
      this.ngRedux.dispatch({ type: ToolAction.SET_WATSON_USER_PASSWORD, payload: value });
   }
}
```

When users change the password the Redux [reducer](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/src/app/store/tool.reducer.ts) is invoked which sets the new value in the Redux store and triggers the validation logic.

```
export function toolReducer(state: Tool = INITIAL_TOOL_STATE, action: any) {
   ...
   switch (action.type) {
      case ToolAction.SET_WATSON_USER_PASSWORD:
         newTool.watsonPassword = action.payload;            
         Validations.validate(newTool);
         return newTool;     
      ... 
      default:
         return state;
    }
}
```

In the [Validations](https://github.com/nheidloff/conversation-inspector-for-ibm-watson/blob/master/src/app/store/validations.ts) class all errors are initially deleted and (re-)created if necessary.

```
export class Validations {
   static validate(tool: Tool) {
      tool.validationErrors = [];
      Validations.watsonPassword(tool);
      ...
   }

   static watsonPassword(tool: Tool): void {
      let itemName: string = 'watsonPassword';
      let error: ValidationError;
      let value: string = "";
      let validatorOutput: boolean;
      let type: string;
      if (tool.watsonPassword) {
         value = tool.watsonPassword;
      }

      validatorOutput = Validators.required(value);
      type = Validators.errorTypeRequired;
      if (validatorOutput) {
         error = new ValidationError(itemName, 'The Watson Conversation password is required.');
         tool.validationErrors.push(error);
      }
      ...
   }
}
```

Check out the full sample application [Conversation Inspector for IBM Watson](https://github.com/nheidloff/conversation-inspector-for-ibm-watson) for details.